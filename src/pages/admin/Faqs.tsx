import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminTopBar from '../../components/admin/AdminTopBar';

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminFaqs() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<FaqRow | null>(null);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: '',
    position: 0,
    published: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate('/admin/login');
    };
    check();
  }, [navigate]);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('position', { ascending: true });
    if (error) {
      setError(error.message);
      setRows([]);
    } else {
      setRows((data as FaqRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const startNew = () => {
    setEditing(null);
    setForm({
      question: '',
      answer: '',
      category: '',
      position: rows.length,
      published: true
    });
  };

  const startEdit = (row: FaqRow) => {
    setEditing(row);
    setForm({
      question: row.question,
      answer: row.answer,
      category: row.category || '',
      position: row.position,
      published: row.published
    });
  };

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        question: form.question,
        answer: form.answer,
        category: form.category || null,
        position: form.position,
        published: form.published
      };

      if (editing) {
        const { error } = await supabase
          .from('faqs')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([payload]);
        if (error) throw error;
      }

      await fetchRows();
      startNew();
    } catch (e: unknown) {
      const error = e as Error;
      setError(error?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row: FaqRow) => {
    if (!confirm(`Delete FAQ "${row.question}"?`)) return;
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', row.id);
    if (error) setError(error.message);
    await fetchRows();
  };

  const moveUp = async (row: FaqRow) => {
    if (row.position === 0) return;
    const { error } = await supabase
      .from('faqs')
      .update({ position: row.position - 1 })
      .eq('id', row.id);
    if (error) setError(error.message);
    await fetchRows();
  };

  const moveDown = async (row: FaqRow) => {
    const { error } = await supabase
      .from('faqs')
      .update({ position: row.position + 1 })
      .eq('id', row.id);
    if (error) setError(error.message);
    await fetchRows();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <AdminTopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage FAQs</h1>
            <div className="text-sm text-gray-600">
              <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={startNew}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              New FAQ
            </button>
            <button
              onClick={fetchRows}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900 mb-3">FAQs</h2>
              {loading ? (
                <div className="text-sm text-gray-600">Loading…</div>
              ) : (
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {rows.map(r => (
                    <div key={r.id} className="rounded-md border border-gray-200 p-3 hover:bg-gray-50">
                      <div className="font-medium text-gray-900 text-sm line-clamp-2">{r.question}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {r.category && `${r.category} • `}Position: {r.position}
                        {!r.published && ' • Draft'}
                      </div>
                      <div className="mt-2 flex gap-1">
                        <button
                          onClick={() => moveUp(r)}
                          disabled={r.position === 0}
                          className="text-xs rounded bg-gray-100 px-2 py-1 disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveDown(r)}
                          className="text-xs rounded bg-gray-100 px-2 py-1"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => startEdit(r)}
                          className="text-xs rounded bg-blue-600 text-white px-2 py-1 ml-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(r)}
                          className="text-xs rounded border border-red-200 text-red-700 px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {rows.length === 0 && <div className="text-sm text-gray-600">No FAQs yet.</div>}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900 mb-4">
                {editing ? `Edit: ${editing.question.substring(0, 50)}...` : 'Create New FAQ'}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Question</label>
                  <input
                    value={form.question}
                    onChange={(e) => setForm(prev => ({ ...prev, question: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                    placeholder="Enter the FAQ question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Answer</label>
                  <ReactQuill
                    value={form.answer}
                    onChange={(value) => setForm(prev => ({ ...prev, answer: value }))}
                    theme="snow"
                    className="mt-1"
                    placeholder="Enter the detailed answer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category (Optional)</label>
                    <input
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="mt-1 w-full rounded-md border-gray-300"
                      placeholder="e.g., Admissions, Fees, Courses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="number"
                      value={form.position}
                      onChange={(e) => setForm(prev => ({ ...prev, position: parseInt(e.target.value) || 0 }))}
                      className="mt-1 w-full rounded-md border-gray-300"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Published</span>
                  </label>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    onClick={onSave}
                    disabled={saving}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}