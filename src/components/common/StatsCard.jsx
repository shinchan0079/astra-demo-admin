import React from 'react';

/**
 * Reusable Stat Card Component
 */
export default function StatsCard({ title, value, icon, color = 'blue' }) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${colorStyles[color] || colorStyles.blue}`}>
        {icon}
      </div>
    </div>
  );
}
