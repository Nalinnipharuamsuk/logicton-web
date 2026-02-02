"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioItem } from '@/types';

export default function NewPortfolioItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const [formData, setFormData] = useState<{
    title: { th: string; en: string };
    description: { th: string; en: string };
    client: { name: string; industry: string };
    technologies: string;
    images: string;
    demoUrl: string;
    githubUrl: string;
    category: PortfolioItem['category'];
    completedDate: string;
    featured: boolean;
    isActive: boolean;
  }>({
    title: { th: '', en: '' },
    description: { th: '', en: '' },
    client: { name: '', industry: '' },
    technologies: '',
    images: '',
    demoUrl: '',
    githubUrl: '',
    category: 'web',
    completedDate: new Date().toISOString().split('T')[0],
    featured: false,
    isActive: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const preview = reader.result as string;
          setUploadedImages(prev => [...prev, { file, preview }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files to server and get paths
      const imagePaths: string[] = [];
      
      if (uploadedImages.length > 0) {
        for (const { file } of uploadedImages) {
          const formDataUpload = new FormData();
          formDataUpload.append('file', file);
          
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formDataUpload,
          });
          
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            if (uploadData.success) {
              imagePaths.push(uploadData.path);
            }
          }
        }
      } else if (formData.images) {
        // Use manual URLs if no files uploaded
        imagePaths.push(...formData.images.split(',').map(i => i.trim()).filter(Boolean));
      }

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        images: imagePaths,
      };

      const res = await fetch('/api/content/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Portfolio item created successfully!');
        router.push('/admin/dashboard/portfolio');
      } else {
        const data = await res.json();
        alert(`Failed to create: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to create portfolio item:', error);
      alert('An error occurred while creating the portfolio item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/portfolio"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Add New Portfolio Item</h1>
            <p className="text-muted-foreground">Create a new portfolio project</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        {/* Title - English */}
        <div>
          <label className="block text-sm font-medium mb-2">Title (English) *</label>
          <input
            type="text"
            value={formData.title.en}
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Title - Thai */}
        <div>
          <label className="block text-sm font-medium mb-2">Title (Thai) *</label>
          <input
            type="text"
            value={formData.title.th}
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, th: e.target.value } })}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            required
          />
        </div>

        {/* Client Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client Name *</label>
            <input
              type="text"
              value={formData.client.name}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, name: e.target.value } })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <input
              type="text"
              value={formData.client.industry}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, industry: e.target.value } })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Description - English */}
        <div>
          <label className="block text-sm font-medium mb-2">Description (English)</label>
          <textarea
            value={formData.description.en}
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          />
        </div>

        {/* Description - Thai */}
        <div>
          <label className="block text-sm font-medium mb-2">Description (Thai)</label>
          <textarea
            value={formData.description.th}
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, th: e.target.value } })}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, Node.js, MongoDB, etc."
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          />
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Images</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <Upload className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">Choose Files</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <span className="text-sm text-muted-foreground">or drag and drop files here</span>
          </div>
          
          {uploadedImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {uploadedImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* URLs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Demo URL</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'mobile' | 'animation' | 'framework' })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="animation">Animation</option>
              <option value="framework">Framework</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Completed Date</label>
            <input
              type="date"
              value={formData.completedDate}
              onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
            />
          </div>
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
              <span className="text-sm font-medium">Publish</span>
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
              <span className="text-sm font-medium">Draft</span>
            </label>
          </div>
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Featured Project</span>
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href="/admin/dashboard/portfolio"
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
            {loading ? 'Saving...' : 'Save Portfolio Item'}
          </button>
        </div>
      </form>
    </div>
  );
}