import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { slugify } from '../../utils/slug';
import { uploadPublicImage } from '../../utils/storageUpload';
import AdminTopBar from '../../components/admin/AdminTopBar';

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  author_name: string | null;
  author_role: string | null;
  author_avatar_url: string | null;
  read_time: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  content_html: string;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminBlogs() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    tagsCsv: '',
    author_name: '',
    author_role: '',
    author_avatar_url: '',
    read_time: '5 min read',
    cover_image_url: '',
    published: false,
    content_html: ''
  });
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    }),
    []
  );

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
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) {
      setError(error.message);
      setRows([]);
    } else {
      setRows((data as BlogRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const startNew = () => {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      category: '',
      tagsCsv: '',
      author_name: '',
      author_role: '',
      author_avatar_url: '',
      read_time: '5 min read',
      cover_image_url: '',
      published: false,
      content_html: ''
    });
  };

  const startEdit = (row: BlogRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      category: row.category || '',
      tagsCsv: (row.tags || []).join(', '),
      author_name: row.author_name || '',
      author_role: row.author_role || '',
      author_avatar_url: row.author_avatar_url || '',
      read_time: row.read_time || '5 min read',
      cover_image_url: row.cover_image_url || '',
      published: row.published,
      content_html: row.content_html
    });
  };

  const onAutoSlug = () => {
    const next = slugify(form.title);
    setForm(prev => ({ ...prev, slug: next }));
  };

  const onCoverUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const url = await uploadPublicImage({
        supabase,
        bucket: 'blog-images',
        file,
        pathPrefix: 'blogs'
      });
      setForm(prev => ({ ...prev, cover_image_url: url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const tags = form.tagsCsv
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const payload = {
        slug: form.slug || slugify(form.title),
        title: form.title,
        excerpt: form.excerpt || null,
        category: form.category || null,
        tags,
        cover_image_url: form.cover_image_url || null,
        author_name: form.author_name || null,
        author_role: form.author_role || null,
        author_avatar_url: form.author_avatar_url || null,
        read_time: form.read_time || null,
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null,
        content_html: form.content_html || '<p></p>'
      };

      if (editing) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert([payload]);
        if (error) throw error;
      }

      await fetchRows();
      startNew();
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row: BlogRow) => {
    if (!confirm(`Delete blog "${row.title}"?`)) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', row.id);
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
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
              New Post
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
              <h2 className="font-semibold text-gray-900 mb-3">Posts</h2>
              {loading ? (
                <div className="text-sm text-gray-600">Loading…</div>
              ) : (
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {rows.map(r => (
                    <div
                      key={r.id}
                      className="rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => startEdit(r)}
                          className="text-left"
                          title="Edit"
                        >
                          <div className="font-medium text-gray-900">{r.title}</div>
                          <div className="text-xs text-gray-500">{r.slug}</div>
                        </button>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            r.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {r.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => startEdit(r)}
                          className="text-xs rounded bg-blue-600 text-white px-2 py-1"
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
                  {rows.length === 0 && (
                    <div className="text-sm text-gray-600">No posts yet.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900 mb-4">
                {editing ? `Edit: ${editing.title}` : 'Create New Post'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      value={form.slug}
                      onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full rounded-md border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={onAutoSlug}
                      className="rounded-md border border-gray-300 bg-white px-3 text-sm"
                    >
                      Auto
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags (comma)</label>
                  <input
                    value={form.tagsCsv}
                    onChange={(e) => setForm(prev => ({ ...prev, tagsCsv: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Author Name</label>
                  <input
                    value={form.author_name}
                    onChange={(e) => setForm(prev => ({ ...prev, author_name: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author Role</label>
                  <input
                    value={form.author_role}
                    onChange={(e) => setForm(prev => ({ ...prev, author_role: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author Avatar URL</label>
                  <input
                    value={form.author_avatar_url}
                    onChange={(e) => setForm(prev => ({ ...prev, author_avatar_url: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Read Time</label>
                  <input
                    value={form.read_time}
                    onChange={(e) => setForm(prev => ({ ...prev, read_time: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                  <div className="mt-1 flex flex-col gap-2">
                    <input
                      value={form.cover_image_url}
                      onChange={(e) => setForm(prev => ({ ...prev, cover_image_url: e.target.value }))}
                      className="w-full rounded-md border-gray-300"
                      placeholder="Paste image URL (optional)"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onCoverUpload(file);
                      }}
                    />
                    {uploadingCover && <div className="text-xs text-gray-600">Uploading…</div>}
                    {form.cover_image_url && (
                      <img
                        src={form.cover_image_url}
                        alt="cover preview"
                        className="h-40 w-full object-cover rounded-md border"
                      />
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={form.content_html}
                    onChange={(val) => setForm(prev => ({ ...prev, content_html: val }))}
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                    />
                    Published
                  </label>

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

            <div className="mt-3 text-xs text-gray-600">
              Tip: Published posts show on public blog page automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

