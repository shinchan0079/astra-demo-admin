import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, LogIn, KeyRound } from 'lucide-react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1-Click Auto-Fill Demo Credentials
  const fillDemoCredentials = () => {
    setEmail('admin@theworkplace.com');
    setPassword('admin123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.login({ email, password });
      if (res.success) {
        onLoginSuccess(res.user, res.token);
        navigate('/');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      if (
        (email === 'admin@theworkplace.com' || email === 'admin') &&
        password === 'admin123'
      ) {
        onLoginSuccess(
          { name: 'Admin', email: 'admin@theworkplace.com', role: 'Super Admin' },
          'demo-session-token'
        );
        navigate('/');
      } else {
        setError('Invalid credentials. Use the Demo Credentials button below.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            TheWorkPlace <span className="text-blue-400">Admin</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to manage contact form inquiries
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="admin@theworkplace.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow transition flex items-center justify-center space-x-2 text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Quick Auto-Fill */}
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2 px-3 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-blue-300 text-xs font-medium transition flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Click here to Auto-Fill Demo Credentials</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Email: <code className="text-slate-300">admin@theworkplace.com</code> | Pass: <code className="text-slate-300">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
