const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Clean & Simple API Helper for CRUD Operations
 * 
 * 1. GET    /api/contacts     -> Read all contacts (READ)
 * 2. POST   /api/contacts     -> Create new contact (CREATE)
 * 3. PUT    /api/contacts/:id -> Update contact (UPDATE)
 * 4. DELETE /api/contacts/:id -> Delete contact (DELETE)
 */
export const api = {
  // 1. Admin Login
  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // 2. READ: Get all contacts
  async getContacts(search = '') {
    const url = search 
      ? `${API_BASE_URL}/contacts?search=${encodeURIComponent(search)}` 
      : `${API_BASE_URL}/contacts`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  },

  // 3. CREATE: Add new contact
  async createContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add contact');
    return data;
  },

  // 4. UPDATE: Update contact by ID
  async updateContact(id, updatedData) {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update contact');
    return data;
  },

  // 5. DELETE: Delete contact by ID
  async deleteContact(id) {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete contact');
    return data;
  },
};
