'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  UserCheck,
  Calendar,
  Users,
  Archive,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
} from 'lucide-react';

// Demo data
const metrics = [
  { label: 'Total Inquiries', value: '24', icon: Inbox, color: 'purple' },
  { label: 'New', value: '5', icon: MessageSquare, color: 'green' },
  { label: 'Contacted', value: '3', icon: UserCheck, color: 'amber' },
  { label: 'Consultation Scheduled', value: '4', icon: Calendar, color: 'sage' },
  { label: 'Active Clients', value: '8', icon: Users, color: 'magenta' },
  { label: 'Closed', value: '4', icon: Archive, color: 'charcoal' },
];

const recentInquiries = [
  {
    id: 1,
    name: 'Jennifer Adams',
    service: 'Pediatric OT',
    status: 'new',
    date: '2026-08-12',
    email: 'jennifer@email.com',
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    service: 'Doula Services',
    status: 'contacted',
    date: '2026-08-11',
    email: 'marcus@email.com',
  },
  {
    id: 3,
    name: 'Aisha Williams',
    service: 'Early Intervention',
    status: 'new',
    date: '2026-08-11',
    email: 'aisha@email.com',
  },
  {
    id: 4,
    name: 'David Chen',
    service: 'Pregnancy Support',
    status: 'scheduled',
    date: '2026-08-10',
    email: 'david@email.com',
  },
  {
    id: 5,
    name: 'Rachel Garcia',
    service: 'Pediatric OT',
    status: 'new',
    date: '2026-08-10',
    email: 'rachel@email.com',
  },
];

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
            <div className="card__stat-value">{metric.value}</div>
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
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inquiry.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>
                        {inquiry.email}
                      </div>
                    </td>
                    <td>{inquiry.service}</td>
                    <td>
                      <span className={`status-badge ${statusConfig[inquiry.status].className}`}>
                        <span className="status-badge__dot" />
                        {statusConfig[inquiry.status].label}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)' }}>
                      {inquiry.date}
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
