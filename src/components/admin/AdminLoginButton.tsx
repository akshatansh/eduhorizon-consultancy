import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin/login')}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
    >
      <Lock className="h-4 w-4" />
      <span>Admin</span>
    </button>
  );
}