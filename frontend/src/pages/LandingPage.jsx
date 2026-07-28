import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Award, ShieldCheck, Languages, ArrowRight, BookOpen, UserCheck, GraduationCap, User, HeartHandshake, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from '../components/common/LanguageToggle';

export default function LandingPage() {
  const { t } = useLanguage();
  const { loginAsDemoRole } = useAuth(); // DEMO MODE
  const navigate = useNavigate();

  // DEMO MODE: Role selector click handler bypassing authentication
  const handleRoleSelect = (role, path) => { // DEMO MODE
    loginAsDemoRole(role); // DEMO MODE
    navigate(path); // DEMO MODE
  }; // DEMO MODE

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight gradient-text">Padanam AI</span>
            <span className="block text-[10px] text-teal-400 tracking-wider font-semibold uppercase">പഠനം AI • SCERT Kerala</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
            DEMO MODE ENABLED
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center space-y-12">
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered Adaptive Learning for SCERT Kerala Board</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-100">
            Personalized Tutoring Grounded in <span className="gradient-text">Kerala SCERT Syllabus</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Select any role below to enter the live demonstration directly without entering credentials.
          </p>
        </div>

        {/* DEMO MODE: Direct Role Selector Grid */}
        <div className="max-w-4xl mx-auto w-full space-y-4"> {/* DEMO MODE */}
          <div className="text-center"> {/* DEMO MODE */}
            <span className="text-xs uppercase tracking-widest font-black text-cyan-400 flex items-center justify-center space-x-1.5">
              <UserCheck className="w-4 h-4" />
              <span>Select Your Role to Access Instant Demo</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* DEMO MODE */}
            {/* Student Button */}
            <button
              onClick={() => handleRoleSelect('student', '/dashboard')}
              className="p-5 rounded-2xl glass-panel border border-cyan-500/30 hover:border-cyan-400 bg-slate-900/90 hover:bg-slate-900 flex flex-col items-center text-center space-y-3 transition transform hover:-translate-y-1 shadow-lg shadow-cyan-500/10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 group-hover:text-cyan-300 transition">Continue as Student</h3>
                <p className="text-xs text-slate-400 mt-1">Anoop Kumar • Class 10</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 w-full">
                Enter Student Dashboard
              </span>
            </button>

            {/* Teacher Button */}
            <button
              onClick={() => handleRoleSelect('teacher', '/teacher')}
              className="p-5 rounded-2xl glass-panel border border-teal-500/30 hover:border-teal-400 bg-slate-900/90 hover:bg-slate-900 flex flex-col items-center text-center space-y-3 transition transform hover:-translate-y-1 shadow-lg shadow-teal-500/10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 group-hover:text-teal-300 transition">Continue as Teacher</h3>
                <p className="text-xs text-slate-400 mt-1">Suresh Kumar • Physics & Math</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30 w-full">
                Enter Teacher Portal
              </span>
            </button>

            {/* Parent Button */}
            <button
              onClick={() => handleRoleSelect('parent', '/parent')}
              className="p-5 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 bg-slate-900/90 hover:bg-slate-900 flex flex-col items-center text-center space-y-3 transition transform hover:-translate-y-1 shadow-lg shadow-emerald-500/10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 group-hover:text-emerald-300 transition">Continue as Parent</h3>
                <p className="text-xs text-slate-400 mt-1">Radhika Nair • Parent</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 w-full">
                Enter Parent Portal
              </span>
            </button>

            {/* Admin Button */}
            <button
              onClick={() => handleRoleSelect('admin', '/admin')}
              className="p-5 rounded-2xl glass-panel border border-amber-500/30 hover:border-amber-400 bg-slate-900/90 hover:bg-slate-900 flex flex-col items-center text-center space-y-3 transition transform hover:-translate-y-1 shadow-lg shadow-amber-500/10 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 group-hover:text-amber-300 transition">Continue as Admin</h3>
                <p className="text-xs text-slate-400 mt-1">System Administrator</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 w-full">
                Enter Admin Management
              </span>
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl glass-panel space-y-3 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">LangGraph Cognitive Tutor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explicit state machine agent that retrieves textbook RAG context and adapts explanations using real-life Kerala analogies or Malayalam breakdowns.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Diagnostic Misconception AI</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              When a student answers a quiz question wrong, Padanam AI diagnoses *why* they were confused and clarifies the underlying concept.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Bilingual English + മലയാളം</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Seamlessly switch between Malayalam and English instructions, tailored for Malayalam medium and English medium state board school students.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Padanam AI © 2026 • SCERT Kerala State Board Adaptive Learning Infrastructure
      </footer>
    </div>
  );
}
