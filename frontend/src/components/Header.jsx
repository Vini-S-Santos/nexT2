import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => logout(navigate)}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 shadow"
      >
        Logout
      </button>
    </div>
  );
}
