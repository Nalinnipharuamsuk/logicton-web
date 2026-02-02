"use client";

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, FileText, Mail, LogOut } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <LayoutDashboard className="h-5 w-5 text-slate-600" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/portfolio"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <Briefcase className="h-5 w-5 text-slate-600" />
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/services"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <FileText className="h-5 w-5 text-slate-600" />
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/team"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <Users className="h-5 w-5 text-slate-600" />
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/messages"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <Mail className="h-5 w-5 text-slate-600" />
                Messages
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium"
              >
                <LayoutDashboard className="h-5 w-5 text-slate-600" />
                View Site
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-medium w-full"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 text-slate-900">
        {children}
      </main>
    </div>
  );
}