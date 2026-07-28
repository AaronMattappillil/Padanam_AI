from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.user import User, StudentProfile, TeacherProfile, ParentProfile, UserRole
from app.models.curriculum import Board
from app.schemas.user import UserCreate, UserLogin, Token, UserOut, SettingsUpdate
from app.core.security import (
    get_password_hash, verify_password,
    create_access_token, create_refresh_token,
    decode_token, oauth2_scheme,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ---------------------------------------------------------------------------
# Shared dependency – loads user + all sub-profiles eagerly
# ---------------------------------------------------------------------------

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token subject")

    result = await db.execute(
        select(User)
        .options(
            selectinload(User.student_profile),
            selectinload(User.teacher_profile),
            selectinload(User.parent_profile),
        )
        .where(User.id == int(user_id))
    )
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    existing = (await db.execute(select(User).where(User.email == user_in.email))).scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
    )
    db.add(new_user)
    await db.flush()

    if user_in.role == UserRole.STUDENT:
        board = (await db.execute(select(Board).where(Board.code == "SCERT_KERALA"))).scalars().first()
        db.add(StudentProfile(
            user_id=new_user.id,
            grade=user_in.grade or 10,
            board_id=board.id if board else None,
            language_preference=user_in.language_preference or "en",
            learning_speed="moderate",
        ))
    elif user_in.role == UserRole.TEACHER:
        db.add(TeacherProfile(user_id=new_user.id))
    elif user_in.role == UserRole.PARENT:
        db.add(ParentProfile(user_id=new_user.id))

    await db.commit()

    # Re-fetch with relationships so Token can be built
    new_user = (await db.execute(
        select(User).options(selectinload(User.student_profile)).where(User.id == new_user.id)
    )).scalars().first()

    return Token(
        access_token=create_access_token(subject=new_user.id, role=new_user.role.value),
        refresh_token=create_refresh_token(subject=new_user.id, role=new_user.role.value),
        role=new_user.role.value,
        user_id=new_user.id,
        full_name=new_user.full_name,
    )


@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.email == user_in.email))).scalars().first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    return Token(
        access_token=create_access_token(subject=user.id, role=user.role.value),
        refresh_token=create_refresh_token(subject=user.id, role=user.role.value),
        role=user.role.value,
        user_id=user.id,
        full_name=user.full_name,
    )


@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    """Relationships are already eager-loaded by get_current_user."""
    return current_user


@router.put("/settings", response_model=UserOut)
async def update_settings(
    settings_in: SettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if settings_in.full_name:
        current_user.full_name = settings_in.full_name

    if current_user.role == UserRole.STUDENT and current_user.student_profile:
        if settings_in.language_preference:
            current_user.student_profile.language_preference = settings_in.language_preference
        if settings_in.learning_speed:
            current_user.student_profile.learning_speed = settings_in.learning_speed

    await db.commit()

    return (await db.execute(
        select(User)
        .options(
            selectinload(User.student_profile),
            selectinload(User.teacher_profile),
            selectinload(User.parent_profile),
        )
        .where(User.id == current_user.id)
    )).scalars().first()
