import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from '../components/common/LanguageToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('student@padanam.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      if (data.role === 'teacher') navigate('/teacher-dashboard');
      else if (data.role === 'parent') navigate('/parent-dashboard');
      else if (data.role === 'admin') navigate('/admin-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check credentials.');
    }
  };

  const setDemoRole = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

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
        <p className="text-sm text-slate-400">Log in to continue your SCERT Kerala learning journey</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
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

          {/* Quick Role Fill Buttons for Viva & Demo */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <p className="text-xs text-slate-500 font-semibold text-center uppercase tracking-wider">Quick Demo Login Accounts</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setDemoRole('student@padanam.ai')} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-cyan-300 border border-slate-700/60 text-center">
                Student
              </button>
              <button onClick={() => setDemoRole('teacher@padanam.ai')} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-teal-300 border border-slate-700/60 text-center">
                Teacher
              </button>
              <button onClick={() => setDemoRole('parent@padanam.ai')} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-amber-300 border border-slate-700/60 text-center">
                Parent
              </button>
              <button onClick={() => setDemoRole('admin@padanam.ai')} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-emerald-300 border border-slate-700/60 text-center">
                Admin
              </button>
            </div>
          </div>

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
