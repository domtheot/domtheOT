'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  UserCheck,
  Calendar,
  Users,
  Archive,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const statusConfig = {
  new: { label: 'New', className: 'status-badge--new' },
  contacted: { label: 'Contacted', className: 'status-badge--contacted' },
  scheduled: { label: 'Scheduled', className: 'status-badge--scheduled' },
  'follow-up': { label: 'Follow Up', className: 'status-badge--follow-up' },
  client: { label: 'Client', className: 'status-badge--client' },
  closed: { label: 'Closed', className: 'status-badge--closed' },
  archived: { label: 'Archived', className: 'status-badge--archived' },
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch('/api/inquiries');
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || 'Unable to load inquiries');
        setInquiries(result.data || []);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const countStatus = (status) => inquiries.filter((inquiry) => inquiry.status === status).length;
  const metrics = [
    { label: 'Total Inquiries', value: inquiries.length, icon: Inbox, color: 'purple' },
    { label: 'New', value: countStatus('new'), icon: MessageSquare, color: 'green' },
    { label: 'Contacted', value: countStatus('contacted'), icon: UserCheck, color: 'amber' },
    { label: 'Consultation Scheduled', value: countStatus('scheduled'), icon: Calendar, color: 'sage' },
    { label: 'Active Clients', value: countStatus('client'), icon: Users, color: 'magenta' },
    { label: 'Closed', value: countStatus('closed'), icon: Archive, color: 'charcoal' },
  ];
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Dashboard</h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
            Welcome back, Dominique
          </p>
        </div>
        <Link href="/admin/inquiries" className="btn btn--primary btn--sm">
          View All Inquiries <ArrowRight size={14} />
        </Link>
      </div>

      {error && <div className="admin-notice" role="alert">{error}</div>}

      {/* Metrics */}
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="card card--stat">
            <div
              className={`card__icon card__icon--${metric.color}`}
              style={{ margin: '0 auto var(--space-3)', width: '44px', height: '44px' }}
            >
              <metric.icon size={20} />
            </div>
            <div className="card__stat-value">{loading ? '—' : metric.value}</div>
            <div className="card__stat-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
              Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="btn btn--ghost btn--sm">
              View All
            </Link>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading && recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{`${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim() || 'Anonymous'}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>
                        {inquiry.email}
                      </div>
                    </td>
                    <td>{inquiry.service}</td>
                    <td>
                      <span className={`status-badge ${(statusConfig[inquiry.status] || statusConfig.new).className}`}>
                        <span className="status-badge__dot" />
                        {(statusConfig[inquiry.status] || statusConfig.new).label}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)' }}>
                      {inquiry.created_at?.slice(0, 10) || '—'}
                    </td>
                    <td>
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="btn btn--ghost btn--sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {loading && <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-warm-gray)' }}>Loading live inquiry data…</td></tr>}
                {!loading && recentInquiries.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-warm-gray)' }}>No inquiries have been submitted yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Link href="/admin/resources" className="btn btn--secondary btn--sm">
            Manage Resources
          </Link>
          <Link href="/admin/testimonials" className="btn btn--secondary btn--sm">
            Manage Testimonials
          </Link>
          <Link href="/admin/faqs" className="btn btn--secondary btn--sm">
            Manage FAQs
          </Link>
          <Link href="/" className="btn btn--ghost btn--sm" target="_blank">
            View Website ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
