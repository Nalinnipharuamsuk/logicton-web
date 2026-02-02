"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Upload, X, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewTeamMember() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ file: File; preview: string } | null>(null);
  const [formData, setFormData] = useState<{
    name: { th: string; en: string };
    role: { th: string; en: string };
    bio: { th: string; en: string };
    email: string;
    linkedin: string;
    photo: string;
    isActive: boolean;
  }>({
    name: { th: '', en: '' },
    role: { th: '', en: '' },
    bio: { th: '', en: '' },
    email: '',
    linkedin: '',
    photo: '',
    isActive: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setUploadedImage({ file, preview });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoPath = formData.photo;

      // Upload file to server and get path
      if (uploadedImage) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', uploadedImage.file);
        formDataUpload.append('folder', 'team');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            photoPath = uploadData.path;
          }
        }
      }

      const currentMembers = await fetch('/api/content/team').then(res => res.json());
      const order = currentMembers.success ? currentMembers.data.length + 1 : 1;
      
      const payload = {
        ...formData,
        photo: photoPath,
        order: order,
      };

      const res = await fetch('/api/content/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Team member added successfully!');
        router.push('/admin/dashboard/team');
      } else {
        const data = await res.json();
        alert(`Failed to add: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to add team member:', error);
      alert('An error occurred while adding team member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/team"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Add New Team Member</h1>
            <p className="text-muted-foreground">Create a new team member profile</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Profile Photo</label>
          <div className="flex items-start gap-4">
            <div className="relative">
              {uploadedImage ? (
                <div className="relative group">
                  <img
                    src={uploadedImage.preview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Current Photo"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <UserIcon className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all max-w-xs">
                <Upload className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium">Choose Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Name - English */}
        <div>
          <label className="block text-sm font-medium mb-2">Name (English) *</label>
          <input
            type="text"
            value={formData.name.en}
            onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Name - Thai */}
        <div>
          <label className="block text-sm font-medium mb-2">Name (Thai) *</label>
          <input
            type="text"
            value={formData.name.th}
            onChange={(e) => setFormData({ ...formData, name: { ...formData.name, th: e.target.value } })}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Role - English */}
        <div>
          <label className="block text-sm font-medium mb-2">Role/Position (English) *</label>
          <input
            type="text"
            value={formData.role.en}
            onChange={(e) => setFormData({ ...formData, role: { ...formData.role, en: e.target.value } })}
            placeholder="e.g., Senior Developer, Project Manager"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Role - Thai */}
        <div>
          <label className="block text-sm font-medium mb-2">Role/Position (Thai) *</label>
          <input
            type="text"
            value={formData.role.th}
            onChange={(e) => setFormData({ ...formData, role: { ...formData.role, th: e.target.value } })}
            placeholder="เช่น นักพัฒนาอาวุโส, ผู้จัดการโครงการ"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Bio - English */}
        <div>
          <label className="block text-sm font-medium mb-2">Bio (English)</label>
          <textarea
            value={formData.bio.en}
            onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, en: e.target.value } })}
            rows={4}
            placeholder="Brief description about the team member..."
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          />
        </div>

        {/* Bio - Thai */}
        <div>
          <label className="block text-sm font-medium mb-2">Bio (Thai)</label>
          <textarea
            value={formData.bio.th}
            onChange={(e) => setFormData({ ...formData, bio: { ...formData.bio, th: e.target.value } })}
            rows={4}
            placeholder="คำอธิบายสั้นๆ เกี่ยวกับทีมงาน..."
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          />
        </div>


        {/* Status Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Status *</label>
          <div className="flex gap-4">
            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
              formData.isActive 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-slate-300 dark:border-slate-600 hover:border-green-300'
            }`}>
              <input
                type="radio"
                name="status"
                checked={formData.isActive}
                onChange={() => setFormData({ ...formData, isActive: true })}
                className="w-4 h-4 text-green-600"
              />
              <span className="text-sm font-medium">Active</span>
            </label>
            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
              !formData.isActive 
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                : 'border-slate-300 dark:border-slate-600 hover:border-yellow-300'
            }`}>
              <input
                type="radio"
                name="status"
                checked={!formData.isActive}
                onChange={() => setFormData({ ...formData, isActive: false })}
                className="w-4 h-4 text-yellow-600"
              />
              <span className="text-sm font-medium">Inactive</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href="/admin/dashboard/team"
            className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {loading ? 'Saving...' : 'Add Team Member'}
          </button>
        </div>
      </form>
    </div>
  );
}