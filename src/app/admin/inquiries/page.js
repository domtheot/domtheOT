'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Database
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

const demoInquiries = [
  { id: 1, name: 'Jennifer Adams', email: 'jennifer@email.com', phone: '(561) 555-0101', service: 'Pediatric OT', status: 'new', date: '2026-08-12', dueDate: '', source: 'Google Search', consultDate: '' },
  { id: 2, name: 'Marcus Thompson', email: 'marcus@email.com', phone: '(772) 555-0102', service: 'Doula Services (Birth)', status: 'contacted', date: '2026-08-11', dueDate: '2026-11-15', source: 'Instagram', consultDate: '' },
  { id: 3, name: 'Aisha Williams', email: 'aisha@email.com', phone: '(786) 555-0103', service: 'Early Intervention', status: 'new', date: '2026-08-11', dueDate: '', source: 'Early Steps', consultDate: '' },
  { id: 4, name: 'David & Mei Chen', email: 'david@email.com', phone: '(561) 555-0104', service: 'Pregnancy Support', status: 'scheduled', date: '2026-08-10', dueDate: '2026-12-01', source: 'Referral', consultDate: '2026-08-18' },
  { id: 5, name: 'Rachel Garcia', email: 'rachel@email.com', phone: '(772) 555-0105', service: 'Pediatric OT', status: 'new', date: '2026-08-10', dueDate: '', source: 'Google Search', consultDate: '' },
  { id: 6, name: 'Keisha Brown', email: 'keisha@email.com', phone: '(786) 555-0106', service: 'Doula Services (Postpartum)', status: 'client', date: '2026-08-05', dueDate: '', source: 'Referral', consultDate: '2026-08-12' },
  { id: 7, name: 'Lisa Patel', email: 'lisa@email.com', phone: '(561) 555-0107', service: 'Pediatric OT', status: 'follow-up', date: '2026-08-03', dueDate: '', source: 'Facebook', consultDate: '' },
  { id: 8, name: 'Robert Kim', email: 'robert@email.com', phone: '(772) 555-0108', service: 'Doula Services (Birth)', status: 'closed', date: '2026-07-28', dueDate: '2026-10-20', source: 'Google Search', consultDate: '' },
  { id: 9, name: 'Amanda Foster', email: 'amanda@email.com', phone: '(786) 555-0109', service: 'Early Intervention', status: 'scheduled', date: '2026-07-25', dueDate: '', source: 'Healthcare Provider', consultDate: '2026-08-15' },
  { id: 10, name: 'Carlos Rivera', email: 'carlos@email.com', phone: '(561) 555-0110', service: 'Pediatric OT', status: 'new', date: '2026-08-12', dueDate: '', source: 'Social Media', consultDate: '' },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDB, setIsLiveDB] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  // Load Inquiries from API with localStorage fallbacks
  useEffect(() => {
    async function loadInquiries() {
      try {
        const res = await fetch('/api/inquiries');
        const json = await res.json();
        
        if (json.success && !json.isDemo && json.data) {
          setInquiries(json.data);
          setIsLiveDB(true);
        } else {
          setInquiries([]);
          setLoadError(json.error || 'Unable to load inquiries.');
        }
      } catch (e) {
        console.error('Error fetching inquiries:', e);
        setInquiries([]);
        setLoadError('Unable to connect to the inquiry database.');
      } finally {
        setLoading(false);
      }
    }
    loadInquiries();
  }, []);

  const getNormalName = (inq) => {
    if (inq.first_name || inq.last_name) {
      return `${inq.first_name || ''} ${inq.last_name || ''}`.trim();
    }
    return inq.name || 'Anonymous';
  };

  const getNormalDate = (inq) => {
    if (inq.created_at) {
      return inq.created_at.split('T')[0];
    }
    return inq.date || '—';
  };

  const getNormalDueDate = (inq) => {
    return inq.due_date || inq.dueDate || '—';
  };

  const getNormalConsultDate = (inq) => {
    return inq.consultation_date || inq.consultDate || '—';
  };

  const filtered = inquiries.filter((inq) => {
    const name = getNormalName(inq).toLowerCase();
    const email = (inq.email || '').toLowerCase();
    const phone = inq.phone || '';
    
    const matchesSearch =
      !search ||
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      phone.includes(search);
      
    const matchesStatus =
      statusFilter === 'all' || inq.status === statusFilter;
      
    const matchesService =
      serviceFilter === 'all' || 
      (inq.service || '').toLowerCase().includes(serviceFilter.toLowerCase());
      
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Status', 'Inquiry Date', 'Due Date', 'Source', 'Consultation Date'];
    const rows = filtered.map((inq) => [
      getNormalName(inq),
      inq.email || '',
      inq.phone || '',
      inq.service || '',
      inq.status || '',
      getNormalDate(inq),
      getNormalDueDate(inq),
      inq.source || '',
      getNormalConsultDate(inq),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dom-the-ot-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueServices = [...new Set(inquiries.map((i) => i.service).filter(Boolean))];

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">
            Inquiries Intake Portal
          </h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
            <Database size={13} style={{ color: isLiveDB ? 'var(--color-green)' : 'var(--color-amber)' }} />
            <span>
              {isLiveDB ? 'Supabase Live Database Connection' : 'Persistent Local Browser Caching'} · {filtered.length} total
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            className="btn btn--secondary btn--sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} /> Filters
          </button>
          <button className="btn btn--secondary btn--sm" onClick={handleExport}>
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {loadError && <div className="admin-notice" role="alert">{loadError}</div>}

      {/* Search & Filters */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div className="search-bar" style={{ maxWidth: '400px' }}>
          <Search size={18} className="search-bar__icon" />
          <input
            type="text"
            className="search-bar__input"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            aria-label="Search inquiries"
          />
          {search && (
            <button
              className="search-bar__clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {showFilters && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)',
              flexWrap: 'wrap',
              background: 'white',
              padding: 'var(--space-4)',
              borderRadius: '12px',
              border: '1.5px solid var(--color-sand)'
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Status</label>
              <select
                className="form-select"
                style={{ padding: '8px 36px 8px 12px', fontSize: 'var(--text-sm)' }}
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Statuses</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Service</label>
              <select
                className="form-select"
                style={{ padding: '8px 36px 8px 12px', fontSize: 'var(--text-sm)' }}
                value={serviceFilter}
                onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Services</option>
                {uniqueServices.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => { setStatusFilter('all'); setServiceFilter('all'); setSearch(''); }}
              style={{ alignSelf: 'flex-end' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-warm-gray)' }}>
            Retrieving inquiries...
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Status</th>
                <th>Inquiry Date</th>
                <th>Due Date</th>
                <th>Source</th>
                <th>Consult</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-warm-gray)' }}>
                    No inquiries match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>{getNormalName(inq)}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>
                        {inq.email}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray-light)' }}>
                        {inq.phone}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{inq.service}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${statusConfig[inq.status || 'new'].className}`}>
                        <span className="status-badge__dot" />
                        {statusConfig[inq.status || 'new'].label}
                      </span>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)' }}>
                      {getNormalDate(inq)}
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)' }}>
                      {getNormalDueDate(inq) || '—'}
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)' }}>
                      {inq.source || 'Direct'}
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)' }}>
                      {getNormalConsultDate(inq) || '—'}
                    </td>
                    <td>
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="btn btn--ghost btn--sm"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination__info">
              Page {currentPage} of {totalPages}
            </span>
            <div className="pagination__buttons">
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
