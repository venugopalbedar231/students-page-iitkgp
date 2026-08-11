"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Notice {
  id: number;
  title: string;
  date: string;
  iso: string;
  desc: string;
  img: string;
  alt: string;
  account: 'inst' | 'tsg';
  category: string;
  createdAt?: string;
}

const CATEGORIES = ['All', 'General', 'Academic', 'Event', 'Admission'];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('');

  // Login Form State
  const [emailInput, setEmailInput] = useState<string>('admin@iitkgp.ac.in');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Notices Dashboard State
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingNotices, setLoadingNotices] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal / Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    account: 'inst' as 'inst' | 'tsg',
    img: '/news/nasha-mukt-bharat.jpg',
    alt: '',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    iso: new Date().toISOString().split('T')[0],
    desc: '',
  });

  const [savingNotice, setSavingNotice] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedToken) {
      setToken(savedToken);
      if (savedEmail) setAdminEmail(savedEmail);
      fetchNotices();
    }
  }, []);

  const fetchNotices = async () => {
    setLoadingNotices(true);
    try {
      const res = await fetch(`${API_URL}/notices`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNotices(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    } finally {
      setLoadingNotices(false);
    }
  };

  // Auth Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid email or password');
      }

      setToken(data.accessToken);
      setAdminEmail(data.admin.email);
      localStorage.setItem('adminToken', data.accessToken);
      localStorage.setItem('adminEmail', data.admin.email);
      fetchNotices();
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
    } catch (e) {
      // ignore
    }
    setToken(null);
    setAdminEmail('');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setPasswordInput('');
  };

  // CRUD Handlers
  const handleOpenAddModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      category: 'General',
      account: 'inst',
      img: '',
      alt: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      iso: new Date().toISOString().split('T')[0],
      desc: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      category: notice.category || 'General',
      account: notice.account,
      img: notice.img,
      alt: notice.alt,
      date: notice.date,
      iso: notice.iso,
      desc: notice.desc,
    });
    setImageFile(null);
    setImagePreview(notice.img || null);
    setIsModalOpen(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageUploading(true);

    try {
      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      setFormData((prev) => ({ ...prev, img: data.url }));
      setImagePreview(data.url);
    } catch (err: any) {
      alert(err.message || 'Failed to upload image to Cloudinary');
      setImageFile(null);
      setImagePreview(null);
    } finally {
      setImageUploading(false);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, img: '' }));
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSavingNotice(true);
    try {
      const isEdit = !!editingNotice;
      const url = isEdit ? `${API_URL}/notices/${editingNotice.id}` : `${API_URL}/notices`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save notice');
      }

      setIsModalOpen(false);
      fetchNotices();
    } catch (err: any) {
      alert(err.message || 'Error saving notice');
    } finally {
      setSavingNotice(false);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!token) return;

    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/notices/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete notice');
      }

      setDeleteConfirmId(null);
      fetchNotices();
    } catch (err: any) {
      alert(err.message || 'Error deleting notice');
    } finally {
      setDeleting(false);
    }
  };

  const filteredNotices = notices.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-inter">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        {!token ? (
          /* SIMPLE LOGIN VIEW */
          <div className="max-w-md mx-auto my-12 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-[#FF7F00] p-6 text-white text-center">
              <i className="fas fa-[#user-shield] text-4xl mb-2"></i>
              <h2 className="font-lexend text-2xl font-bold">Admin Portal Login</h2>
              <p className="text-xs text-orange-100 mt-1">
                IIT Kharagpur Student Page Management
              </p>
            </div>

            <div className="p-6">
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                  <i className="fas fa-exclamation-circle mr-2"></i> {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-3.5 text-gray-400"></i>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF7F00] focus:border-[#FF7F00] outline-none"
                      placeholder="admin@iitkgp.ac.in"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3.5 text-gray-400"></i>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF7F00] focus:border-[#FF7F00] outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-[#FF7F00] hover:bg-[#e06f00] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Authenticating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt"></i> Login to Dashboard
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ADMIN DASHBOARD VIEW */
          <div className="space-y-6">
            {/* Top Admin Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-[#FF7F00] uppercase tracking-wider font-lexend">
                  Admin Control Panel
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-gray-900 mt-0.5">
                  Notice & Announcement Management
                </h1>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <i className="fas fa-user-circle text-[#FF7F00]"></i> Logged in as: <span className="font-semibold text-gray-700">{adminEmail}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2.5 bg-[#FF7F00] hover:bg-[#e06f00] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-plus"></i> Add Notice
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-lexend transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#FF7F00] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <i className="fas fa-search absolute left-3 top-3 text-gray-400 text-xs"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notices..."
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#FF7F00]"
                />
              </div>
            </div>

            {/* Notices List */}
            {loadingNotices ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <i className="fas fa-spinner fa-spin text-3xl text-[#FF7F00] mb-3"></i>
                <p className="text-sm text-gray-500 font-inter">Loading notices from database...</p>
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <i className="fas fa-folder-open text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-base font-semibold text-gray-700">No notices found</h3>
                <p className="text-xs text-gray-500 mt-1">Try selecting a different category or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="h-44 bg-gray-100 relative overflow-hidden">
                      <img
                        src={notice.img}
                        alt={notice.alt || notice.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=60';
                        }}
                      />
                      <span className="absolute top-2 right-2 text-[10px] uppercase font-bold tracking-wider bg-[#FF7F00] text-white px-2 py-0.5 rounded shadow-sm">
                        {notice.category}
                      </span>
                      <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                        @{notice.account === 'tsg' ? 'tsg.iitkharagpur' : 'iit.kgp'}
                      </span>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-[11px] text-gray-400 mb-1">
                          <span>Notice ID: #{notice.id}</span>
                          <time>{notice.date}</time>
                        </div>
                        <h3 className="font-bold font-lexend text-base text-gray-900 leading-snug mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                          {notice.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(notice)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(notice.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 my-8">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-lexend text-lg font-bold text-gray-900">
                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Nasha Mukt Bharat pledge at LBS Hall"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                  >
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Event">Event</option>
                    <option value="Admission">Admission</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Source Account</label>
                  <select
                    value={formData.account}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value as 'inst' | 'tsg' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                  >
                    <option value="inst">@iit.kgp (Institute)</option>
                    <option value="tsg">@tsg.iitkharagpur (Gymkhana)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Display Date</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 26 Jun 2026"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">ISO Date</label>
                  <input
                    type="date"
                    required
                    value={formData.iso}
                    onChange={(e) => setFormData({ ...formData, iso: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">Notice Image</label>

                {/* Preview / Dropzone */}
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50" style={{ height: '160px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {imageUploading && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                        <i className="fas fa-spinner fa-spin text-white text-2xl"></i>
                        <span className="text-white text-xs font-semibold">Uploading to Cloudinary…</span>
                      </div>
                    )}
                    {!imageUploading && (
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-xs shadow transition-colors"
                        title="Remove image"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="imageUploadInput"
                    className="flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-orange-50 hover:border-[#FF7F00] transition-colors"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                    <span className="text-xs font-semibold text-gray-500">Click to upload image</span>
                    <span className="text-[10px] text-gray-400">JPEG, PNG, WebP, GIF — max 5 MB</span>
                    <input
                      id="imageUploadInput"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={imageUploading}
                    />
                  </label>
                )}

                {/* URL fallback / display */}
                <div className="mt-2">
                  <label className="block text-[10px] text-gray-400 mb-1">Or enter image URL directly</label>
                  <input
                    type="text"
                    value={formData.img}
                    onChange={(e) => {
                      setFormData({ ...formData, img: e.target.value });
                      setImagePreview(e.target.value || null);
                    }}
                    placeholder="https://res.cloudinary.com/… or /news/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#FF7F00] text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Summary of notice content..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#FF7F00]"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingNotice}
                  className="px-4 py-2 bg-[#FF7F00] hover:bg-[#e06f00] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  {savingNotice ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> {editingNotice ? 'Update Notice' : 'Create Notice'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className="font-lexend text-base font-bold text-gray-900">Delete Notice #{deleteConfirmId}?</h3>
            <p className="text-xs text-gray-500 mt-1">This action cannot be undone and will remove the notice permanently.</p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteNotice(deleteConfirmId)}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                {deleting ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-trash"></i>} Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
