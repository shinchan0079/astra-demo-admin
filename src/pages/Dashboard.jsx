import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Users, CheckCircle, Clock } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import { api } from '../services/api';

/**
 * Dashboard Page - Overview statistics and quick summary
 */
export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getContacts();
        if (res.success) {
          setContacts(res.data);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalCount = contacts.length;
  const pendingCount = contacts.filter((c) => c.status === 'Pending').length;
  const resolvedCount = contacts.filter((c) => c.status === 'Resolved' || c.status === 'Contacted').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard Overview</h1>
        <p className="text-slate-500 text-xs mt-1">
          Real-time summary of contact inquiries from the co-working website.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatsCard
          title="Total Inquiries"
          value={totalCount}
          icon="📋"
          color="blue"
        />
        <StatsCard
          title="Pending Attention"
          value={pendingCount}
          icon="⏳"
          color="amber"
        />
        <StatsCard
          title="Resolved / Contacted"
          value={resolvedCount}
          icon="✅"
          color="emerald"
        />
      </div>

      {/* Quick Action & Recent Inquiries Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Inquiries</h2>
            <p className="text-xs text-slate-500">Latest messages submitted via the Contact Us form.</p>
          </div>
          <Link
            to="/inquiries"
            className="flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition"
          >
            <span>Manage All Inquiries (CRUD)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent 5 List */}
        <div className="divide-y divide-slate-100">
          {contacts.slice(0, 5).map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-slate-500">{item.subject}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  item.status === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-700'
                    : item.status === 'Contacted'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {item.status || 'Pending'}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
            </div>
          ))}

          {contacts.length === 0 && !loading && (
            <p className="py-6 text-center text-slate-400 text-xs">No inquiries yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
