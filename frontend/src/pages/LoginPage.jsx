import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from '../components/common/LanguageToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('student@padanam.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loginAsDemoRole, loading } = useAuth(); // DEMO MODE
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      if (data.role === 'teacher') navigate('/teacher');
      else if (data.role === 'parent') navigate('/parent');
      else if (data.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check credentials.');
    }
  };

  // DEMO MODE: Bypasses login screen credentials and routes directly to role dashboard
  const handleDemoLogin = (role, path) => { // DEMO MODE
    loginAsDemoRole(role); // DEMO MODE
    navigate(path); // DEMO MODE
  }; // DEMO MODE

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black gradient-text">Padanam AI</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-100">Welcome Back to Padanam AI</h2>
        <p className="text-sm text-slate-400">Log in or select an instant demo role below</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          
          {/* DEMO MODE: Quick Role Selectors */}
          <div className="space-y-2 pb-2 border-b border-slate-800"> {/* DEMO MODE */}
            <p className="text-xs text-cyan-400 font-bold text-center uppercase tracking-wider">Demo Mode Instant Access</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleDemoLogin('student', '/dashboard')} className="p-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-center font-semibold">
                Student Role
              </button>
              <button onClick={() => handleDemoLogin('teacher', '/teacher')} className="p-2.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-center font-semibold">
                Teacher Role
              </button>
              <button onClick={() => handleDemoLogin('parent', '/parent')} className="p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-center font-semibold">
                Parent Role
              </button>
              <button onClick={() => handleDemoLogin('admin', '/admin')} className="p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-center font-semibold">
                Admin Role
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Logging in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyan-400 hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
