import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { slugify } from '../../utils/slug';
import { uploadPublicImage } from '../../utils/storageUpload';
import AdminTopBar from '../../components/admin/AdminTopBar';

type CollegeRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  courses: string[] | null;
  images: string[] | null;
  description: string | null;
  fees: string | null;
  website: string | null;
  established: string | null;
  ranking: string | null;
  facilities: string[] | null;
  highlights: string[] | null;
  updated_at: string;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminCollegesManager() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CollegeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<CollegeRow | null>(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    location: 'Greater Noida',
    coursesCsv: '',
    description: '',
    fees: '',
    website: '',
    established: '',
    ranking: '',
    facilitiesCsv: '',
    highlightsCsv: '',
    cover_image_url: '',
    gallery_urls: [] as string[]
  });
  const [uploading, setUploading] = useState(false);
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
    const { data, error } = await supabase.from('colleges').select('*').order('name');
    if (error) {
      setError(error.message);
      setRows([]);
    } else {
      setRows((data as CollegeRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const startNew = () => {
    setEditing(null);
    setForm({
      name: '',
      slug: '',
      location: 'Greater Noida',
      coursesCsv: '',
      description: '',
      fees: '',
      website: '',
      established: '',
      ranking: '',
      facilitiesCsv: '',
      highlightsCsv: '',
      cover_image_url: '',
      gallery_urls: []
    });
  };

  const startEdit = (row: CollegeRow) => {
    const images = row.images || [];
    setEditing(row);
    setForm({
      name: row.name,
      slug: row.slug,
      location: row.location,
      coursesCsv: (row.courses || []).join(', '),
      description: row.description || '',
      fees: row.fees || '',
      website: row.website || '',
      established: row.established || '',
      ranking: row.ranking || '',
      facilitiesCsv: (row.facilities || []).join(', '),
      highlightsCsv: (row.highlights || []).join(', '),
      cover_image_url: images[0] || '',
      gallery_urls: images.slice(1)
    });
  };

  const onAutoSlug = () => setForm(prev => ({ ...prev, slug: slugify(prev.name) }));

  const uploadCover = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadPublicImage({
        supabase,
        bucket: 'college-images',
        file,
        pathPrefix: 'colleges/cover'
      });
      setForm(prev => ({ ...prev, cover_image_url: url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const uploadGallery = async (files: FileList) => {
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadPublicImage({
          supabase,
          bucket: 'college-images',
          file,
          pathPrefix: 'colleges/gallery'
        });
        urls.push(url);
      }
      setForm(prev => ({ ...prev, gallery_urls: [...prev.gallery_urls, ...urls] }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const images = [form.cover_image_url, ...form.gallery_urls].filter(Boolean);
      const payload = {
        slug: form.slug || slugify(form.name),
        name: form.name,
        location: form.location,
        courses: form.coursesCsv.split(',').map(s => s.trim()).filter(Boolean),
        images,
        description: form.description || null,
        fees: form.fees || null,
        website: form.website || null,
        established: form.established || null,
        ranking: form.ranking || null,
        facilities: form.facilitiesCsv.split(',').map(s => s.trim()).filter(Boolean),
        highlights: form.highlightsCsv.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editing) {
        const { error } = await supabase.from('colleges').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('colleges').insert([payload]);
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

  const onDelete = async (row: CollegeRow) => {
    if (!confirm(`Delete college "${row.name}"?`)) return;
    const { error } = await supabase.from('colleges').delete().eq('id', row.id);
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Colleges</h1>
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
              New College
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
              <h2 className="font-semibold text-gray-900 mb-3">Colleges</h2>
              {loading ? (
                <div className="text-sm text-gray-600">Loading…</div>
              ) : (
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {rows.map(r => (
                    <div key={r.id} className="rounded-md border border-gray-200 p-3 hover:bg-gray-50">
                      <div className="font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.slug}</div>
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
                  {rows.length === 0 && <div className="text-sm text-gray-600">No colleges yet.</div>}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900 mb-4">
                {editing ? `Edit: ${editing.name}` : 'Create New College'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    value={form.location}
                    onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  >
                    <option>Greater Noida</option>
                    <option>Noida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Courses (comma)</label>
                  <input
                    value={form.coursesCsv}
                    onChange={(e) => setForm(prev => ({ ...prev, coursesCsv: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fees</label>
                  <input
                    value={form.fees}
                    onChange={(e) => setForm(prev => ({ ...prev, fees: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    value={form.website}
                    onChange={(e) => setForm(prev => ({ ...prev, website: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Established</label>
                  <input
                    value={form.established}
                    onChange={(e) => setForm(prev => ({ ...prev, established: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ranking</label>
                  <input
                    value={form.ranking}
                    onChange={(e) => setForm(prev => ({ ...prev, ranking: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Facilities (comma)</label>
                  <input
                    value={form.facilitiesCsv}
                    onChange={(e) => setForm(prev => ({ ...prev, facilitiesCsv: e.target.value }))}
                    className="mt-1 w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highlights (comma)</label>
                  <input
                    value={form.highlightsCsv}
                    onChange={(e) => setForm(prev => ({ ...prev, highlightsCsv: e.target.value }))}
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
                        if (file) uploadCover(file);
                      }}
                    />
                    {uploading && <div className="text-xs text-gray-600">Uploading…</div>}
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
                  <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                  <div className="mt-1 flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length) uploadGallery(files);
                      }}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {form.gallery_urls.map((url) => (
                        <div key={url} className="relative">
                          <img src={url} alt="gallery" className="h-24 w-full object-cover rounded border" />
                          <button
                            type="button"
                            onClick={() =>
                              setForm(prev => ({
                                ...prev,
                                gallery_urls: prev.gallery_urls.filter(u => u !== url)
                              }))
                            }
                            className="absolute right-1 top-1 rounded bg-white/90 px-2 py-0.5 text-xs"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-end pt-2">
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
              Note: Colleges show on public Colleges page automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

