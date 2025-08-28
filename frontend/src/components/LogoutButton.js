import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user info
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');

    // Redirect to login
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
