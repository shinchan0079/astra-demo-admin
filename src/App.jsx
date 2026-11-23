import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/Inquiries';
import Login from './pages/Login';

// Layout wrapper for authenticated admin screens
function AdminLayout({ currentUser, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentUser={currentUser}
        onLogout={onLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('admin_token'));
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('admin_user') || 'null');
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout currentUser={currentUser} onLogout={handleLogout}>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Inquiries CRUD Route */}
        <Route
          path="/inquiries"
          element={
            isAuthenticated ? (
              <AdminLayout currentUser={currentUser} onLogout={handleLogout}>
                <Inquiries />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
