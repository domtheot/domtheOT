'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { name: 'Resources', href: '/admin/resources', icon: BookOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth for login page
  const isLoginPage = pathname === '/admin/login';
  const isAuth = isLoginPage || authenticated;

  useEffect(() => {
    if (isLoginPage) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setAuthenticated(true);
      else router.push('/admin/login');
    });
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  if (!isAuth) return null;
  if (isLoginPage) return <>{children}</>;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            src="/images/logo.png"
            alt="Dom the OT"
            width={130}
            height={36}
            className="admin-sidebar__logo"
          />
          <button
            className="admin-sidebar__link"
            onClick={() => setSidebarOpen(false)}
            style={{ display: 'none' }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar__link ${
                pathname === link.href ? 'admin-sidebar__link--active' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__logout">
          <button className="admin-sidebar__link" onClick={handleLogout}>
            <LogOut size={18} />
            Sign Out
          </button>
          <Link
            href="/"
            className="admin-sidebar__link"
            style={{ marginTop: 'var(--space-2)' }}
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Mobile Header */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-warm-white)',
              border: '1px solid var(--color-sand)',
            }}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
