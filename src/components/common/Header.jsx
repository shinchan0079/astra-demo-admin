import React from 'react';
import { 
  Menu, 
  RotateCw, 
  LogOut 
} from 'lucide-react';

export default function Header({ 
  onMenuToggle, 
  onRefresh, 
  loading, 
  currentUser, 
  onLogout,
  title = 'Inquiry Management'
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Admin /</span>
          <span className="text-sm font-bold text-slate-800">{title}</span>
        </div>
      </div>

      {/* Right: Server Status, Refresh, User Profile & Logout */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Backend Status indicator */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Backend Connected</span>
        </div>

        {/* Refresh Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh Data"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 transition"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        )}

        {/* User Info */}
        <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-slate-200">
          <span className="text-xs font-medium text-slate-600">
            {currentUser?.email || 'admin@theworkplace.com'}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 text-xs font-semibold transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
