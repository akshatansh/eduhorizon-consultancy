import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import AdminTopBar from '../../components/admin/AdminTopBar';

type AdminUser = {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminAccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'admin'
  });

  const parseSupabaseError = (err: unknown, fallback: string) => {
    if (!err) return fallback;
    if (err instanceof Error) return err.message || fallback;

    const maybe = err as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
      error_description?: string;
    };

    const parts = [
      maybe.message,
      maybe.error_description,
      maybe.details,
      maybe.hint,
      maybe.code ? `code: ${maybe.code}` : undefined
    ].filter(Boolean);

    return parts.length ? parts.join(' | ') : fallback;
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        navigate('/admin/login');
        return;
      }

      const { data: me, error: meError } = await supabase
        .from('admin_users')
        .select('role, is_active')
        .eq('email', session.user.email)
        .single();

      if (meError || !me || !me.is_active || me.role !== 'super_admin') {
        setIsSuperAdmin(false);
        setError('Only super admin can manage admin access.');
        return;
      }

      setIsSuperAdmin(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('id,email,role,is_active,created_at,last_login')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setUsers((data as AdminUser[]) || []);
    } catch (e) {
      setError(parseSupabaseError(e, 'Failed to load admin users'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createAdmin = async () => {
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const targetEmail = form.email.trim().toLowerCase();

      // Preferred path: RPC helper (hash + upsert in DB function).
      const { error: rpcError } = await supabase.rpc('create_admin_user', {
        p_email: targetEmail,
        p_password: form.password,
        p_role: form.role
      });

      if (rpcError) {
        // Fallback path: direct role toggle for already-created admin rows.
        const { data: existingAdmin, error: checkError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', targetEmail)
          .maybeSingle();

        if (checkError || !existingAdmin) {
          throw rpcError;
        }

        const { error: updateError } = await supabase
          .from('admin_users')
          .update({
            role: form.role,
            is_active: true
          })
          .eq('email', targetEmail);

        if (updateError) {
          throw rpcError;
        }
      }

      setForm({ email: '', password: '', role: 'admin' });
      await load();
    } catch (e) {
      setError(parseSupabaseError(e, 'Failed to create admin'));
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (user: AdminUser) => {
    setError(null);
    const { error } = await supabase
      .from('admin_users')
      .update({ is_active: !user.is_active })
      .eq('id', user.id);

    if (error) {
      setError(parseSupabaseError(error, 'Failed to update admin status'));
      return;
    }
    await load();
  };

  const updateRole = async (userId: string, role: string) => {
    setError(null);
    const { error } = await supabase.from('admin_users').update({ role }).eq('id', userId);
    if (error) {
      setError(parseSupabaseError(error, 'Failed to update admin role'));
      return;
    }
    await load();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <AdminTopBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access Control</h1>
            <div className="text-sm text-gray-600">
              <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!isSuperAdmin ? (
          <div className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
            Super admin permission required.
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="font-semibold text-gray-900 mb-3">Create / Grant Admin Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="email"
                  placeholder="Admin email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="rounded-md border-gray-300"
                />
                <input
                  type="password"
                  placeholder="Temporary password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="rounded-md border-gray-300"
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                  className="rounded-md border-gray-300"
                >
                  <option value="admin">admin</option>
                  <option value="super_admin">super_admin</option>
                </select>
                <button
                  onClick={createAdmin}
                  disabled={saving}
                  className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Grant Access'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                        Loading...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500" colSpan={5}>
                        No admin users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <select
                            value={user.role}
                            onChange={(e) => updateRole(user.id, e.target.value)}
                            className="rounded-md border-gray-300 text-sm"
                          >
                            <option value="admin">admin</option>
                            <option value="super_admin">super_admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {user.is_active ? 'active' : 'inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <button
                            onClick={() => toggleActive(user)}
                            className="rounded-md border border-gray-300 px-2 py-1 text-xs"
                          >
                            {user.is_active ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

