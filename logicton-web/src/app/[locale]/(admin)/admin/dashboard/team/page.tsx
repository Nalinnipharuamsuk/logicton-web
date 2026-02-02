"use client";

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, User as UserIcon, MoveUp, MoveDown } from 'lucide-react';
import Link from 'next/link';
import type { TeamMember } from '@/types';

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/team');
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error('Failed to load team members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    setDeleteId(id);
    try {
      const res = await fetch(`/api/content/team/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMembers(members.filter(member => member.id !== id));
        alert('Team member deleted successfully');
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred while deleting');
    } finally {
      setDeleteId(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    const newMembers = [...members];
    [newMembers[index], newMembers[index - 1]] = [newMembers[index - 1], newMembers[index]];
    
    // Update order values
    newMembers.forEach((member, idx) => {
      member.order = idx + 1;
    });

    try {
      const res = await fetch('/api/content/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMembers),
      });

      if (res.ok) {
        setMembers(newMembers);
      } else {
        alert('Failed to reorder team members');
      }
    } catch (error) {
      console.error('Failed to reorder:', error);
      alert('An error occurred while reordering');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === members.length - 1) return;
    
    const newMembers = [...members];
    [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
    
    // Update order values
    newMembers.forEach((member, idx) => {
      member.order = idx + 1;
    });

    try {
      const res = await fetch('/api/content/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMembers),
      });

      if (res.ok) {
        setMembers(newMembers);
      } else {
        alert('Failed to reorder team members');
      }
    } catch (error) {
      console.error('Failed to reorder:', error);
      alert('An error occurred while reordering');
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.name.th.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.th.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                        (filterStatus === 'active' && member.isActive) ||
                        (filterStatus === 'inactive' && !member.isActive);
    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.order - b.order);

  const activeCount = members.filter(member => member.isActive).length;
  const inactiveCount = members.filter(member => !member.isActive).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <Link
          href="/admin/dashboard/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            filterStatus === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          All ({members.length})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            filterStatus === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilterStatus('inactive')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            filterStatus === 'inactive'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-foreground hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          Inactive ({inactiveCount})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Team Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? 'No team members found matching your search.' : 'No team members yet. Add your first team member!'}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-card rounded-lg border border-border p-4 flex gap-4 hover:shadow-md transition-shadow"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name.en}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg flex-shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <UserIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{member.name.en}</h3>
                    <p className="text-sm text-muted-foreground">{member.role.en}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    member.isActive 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{member.bio.en}</p>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <Link
                  href={`/admin/dashboard/team/edit/${member.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded hover:bg-muted/80 transition-colors text-sm text-foreground pointer-events-auto cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(member.id);
                  }}
                  disabled={deleteId === member.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors text-sm disabled:opacity-50 pointer-events-auto cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleteId === member.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>

              {/* Reorder Buttons */}
              <div className="flex flex-col gap-1 ml-2">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Move Up"
                >
                  <MoveUp className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === filteredMembers.length - 1}
                  className="p-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Move Down"
                >
                  <MoveDown className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}