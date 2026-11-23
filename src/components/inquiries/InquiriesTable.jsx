import React from 'react';
import { Pencil, Trash2, RotateCw, Inbox } from 'lucide-react';

/**
 * Clean & Reusable Table Component for displaying inquiries (CRUD READ, UPDATE, DELETE)
 */
export default function InquiriesTable({
  contacts,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Loading inquiries...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Inbox className="w-8 h-8 text-slate-300" />
                      <span>No inquiries found.</span>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              contacts.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Number */}
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.name}
                  </td>

                  {/* Email */}
                  <td className="py-3 px-4 text-slate-600">
                    <a href={`mailto:${item.email}`} className="hover:text-blue-600 hover:underline">
                      {item.email}
                    </a>
                  </td>

                  {/* Subject */}
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {item.subject}
                  </td>

                  {/* Message Preview */}
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.message}>
                    {item.message}
                  </td>

                  {/* Quick Status Update */}
                  <td className="py-3 px-4">
                    <select
                      value={item.status || 'Pending'}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                      className={`text-[11px] font-semibold px-2 py-1 rounded-md border cursor-pointer outline-none transition ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.status === 'Contacted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                  </td>

                  {/* Edit & Delete Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                        title="Edit Inquiry"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDelete(item.id, item.name)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
