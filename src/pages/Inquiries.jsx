import React, { useState, useEffect } from 'react';
import { Plus, Search, RotateCw, CheckCircle } from 'lucide-react';
import InquiriesTable from '../components/inquiries/InquiriesTable';
import ContactModal from '../components/inquiries/ContactModal';
import { api } from '../services/api';

/**
 * Inquiries Page - Full CRUD Operations (Create, Read, Update, Delete)
 */
export default function Inquiries() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Toast
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // [READ]
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.getContacts(search);
      if (res.success) {
        setContacts(res.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showToast('Could not fetch data. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search]);

  // [CREATE & UPDATE]
  const handleSaveContact = async (formData) => {
    try {
      if (editingContact) {
        // UPDATE (PUT)
        await api.updateContact(editingContact.id, formData);
        showToast('Contact inquiry updated successfully!');
      } else {
        // CREATE (POST)
        await api.createContact(formData);
        showToast('New contact added successfully!');
      }
      setIsModalOpen(false);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  // [DELETE]
  const handleDeleteContact = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete inquiry from "${name}"?`);
    if (!confirmed) return;

    try {
      await api.deleteContact(id);
      showToast('Contact deleted successfully!');
      fetchContacts();
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  // Quick Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateContact(id, { status: newStatus });
      showToast(`Status updated to "${newStatus}"`);
      fetchContacts();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs font-medium flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              Total: {contacts.length}
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Perform live CRUD operations directly on the backend database.
          </p>
        </div>

        {/* Search, Refresh & Add */}
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 shadow-xs"
            />
          </div>

          <button
            onClick={fetchContacts}
            disabled={loading}
            title="Refresh Inquiries"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg shadow-xs transition"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <button
            onClick={() => {
              setEditingContact(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* CRUD Table Component */}
      <InquiriesTable
        contacts={contacts}
        loading={loading}
        onEdit={(item) => {
          setEditingContact(item);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteContact}
        onStatusChange={handleStatusChange}
      />

      {/* Add / Edit Modal Component */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
      />
    </div>
  );
}
