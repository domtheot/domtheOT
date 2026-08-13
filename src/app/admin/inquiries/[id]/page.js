'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Baby,
  MessageSquare,
  Clock,
  Plus,
  Send,
  User,
  ExternalLink
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

// Initial local dummy fallback notes if none exist in localStorage
const initialDemoNotes = [
  { id: 1, inquiry_id: 1, content: 'Initial inquiry received via website contact form.', created_at: new Date().toISOString(), type: 'system' }
];

export default function InquiryDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [inquiry, setInquiry] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDB, setIsLiveDB] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Load Inquiry details on mount
  useEffect(() => {
    async function fetchInquiryDetails() {
      try {
        const res = await fetch(`/api/inquiries/${id}`);
        const json = await res.json();
        
        if (json.success && json.data) {
          setInquiry(json.data);
          setNotes(json.data.notes || []);
          setIsLiveDB(true);
        } else {
          // Fallback to local storage inquiries lookup
          loadFromLocalStorage();
        }
      } catch (e) {
        console.error('API get inquiry detail failed, using LocalStorage fallback:', e);
        loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    }

    function loadFromLocalStorage() {
      const savedInqs = localStorage.getItem('dom_inquiries');
      if (savedInqs) {
        const list = JSON.parse(savedInqs);
        // Find matching inquiry by string or numeric ID
        const match = list.find((item) => String(item.id) === String(id));
        if (match) {
          setInquiry(match);
          
          // Load local notes for this inquiry
          const savedNotes = localStorage.getItem(`dom_notes_${id}`);
          if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
          } else {
            const initialNotes = [
              {
                id: 1,
                inquiry_id: id,
                content: 'Initial inquiry received via website contact form.',
                created_at: match.created_at || new Date().toISOString(),
                type: 'system'
              }
            ];
            setNotes(initialNotes);
            localStorage.setItem(`dom_notes_${id}`, JSON.stringify(initialNotes));
          }
          return;
        }
      }
      setInquiry(null);
    }

    fetchInquiryDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (!inquiry) return;
    
    // Status update text for note tracking
    const statusNoteText = `Status updated to "${statusConfig[newStatus].label}"`;

    if (isLiveDB) {
      try {
        const res = await fetch(`/api/inquiries/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const json = await res.json();
        if (json.success) {
          setInquiry(prev => ({ ...prev, status: newStatus }));
          // Refetch notes to include system status update note
          const notesRes = await fetch(`/api/inquiries/${id}`);
          const notesJson = await notesRes.json();
          if (notesJson.success && notesJson.data) {
            setNotes(notesJson.data.notes || []);
          }
        }
      } catch (e) {
        console.error('Failed to update status on DB:', e);
      }
    } else {
      // Offline fallback: Update in LocalStorage inquiries list
      const savedInqs = localStorage.getItem('dom_inquiries');
      if (savedInqs) {
        const list = JSON.parse(savedInqs);
        const updated = list.map((item) => 
          String(item.id) === String(id) ? { ...item, status: newStatus } : item
        );
        localStorage.setItem('dom_inquiries', JSON.stringify(updated));
        setInquiry(prev => ({ ...prev, status: newStatus }));

        // Append system log to local notes
        const updatedNotes = [
          ...notes,
          {
            id: Date.now(),
            inquiry_id: id,
            content: statusNoteText,
            created_at: new Date().toISOString(),
            type: 'system'
          }
        ];
        setNotes(updatedNotes);
        localStorage.setItem(`dom_notes_${id}`, JSON.stringify(updatedNotes));
      }
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !inquiry) return;

    setIsSubmittingNote(true);

    if (isLiveDB) {
      try {
        const res = await fetch(`/api/inquiries/${id}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newNote })
        });
        const json = await res.json();
        if (json.success && json.data) {
          setNotes(prev => [...prev, json.data]);
          setNewNote('');
        }
      } catch (e) {
        console.error('Failed to save note to DB:', e);
      } finally {
        setIsSubmittingNote(false);
      }
    } else {
      // Offline fallback: save note in LocalStorage
      const updatedNotes = [
        ...notes,
        {
          id: Date.now(),
          inquiry_id: id,
          content: newNote,
          created_at: new Date().toISOString(),
          type: 'manual'
        }
      ];
      setNotes(updatedNotes);
      localStorage.setItem(`dom_notes_${id}`, JSON.stringify(updatedNotes));
      setNewNote('');
      setIsSubmittingNote(false);
    }
  };

  const getNormalName = () => {
    if (!inquiry) return '';
    if (inquiry.first_name || inquiry.last_name) {
      return `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim();
    }
    return inquiry.name || 'Anonymous Client';
  };

  const getNormalDate = () => {
    if (!inquiry) return '';
    if (inquiry.created_at) {
      return new Date(inquiry.created_at).toLocaleString();
    }
    return inquiry.date ? `${inquiry.date} 10:30 AM` : '—';
  };

  const getNormalDueDate = () => {
    return inquiry ? (inquiry.due_date || inquiry.dueDate || '') : '';
  };

  const getNormalConsultDate = () => {
    return inquiry ? (inquiry.consultation_date || inquiry.consultDate || '') : '';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-warm-gray)' }}>
        Retrieving client profile data...
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
        <h2 style={{ color: 'var(--color-charcoal)', marginBottom: 'var(--space-4)' }}>Inquiry Not Found</h2>
        <p style={{ color: 'var(--color-warm-gray)', marginBottom: 'var(--space-6)' }}>
          The inquiry request ID you are trying to access does not exist or has been deleted.
        </p>
        <Link href="/admin/inquiries" className="btn btn--secondary btn--sm">
          Return to Inquiries
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Header */}
      <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/admin/inquiries" className="btn btn--ghost btn--sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={14} /> Back to Inquiries List
        </Link>
        <span style={{ fontSize: '12px', color: 'var(--color-warm-gray-light)', fontWeight: 600 }}>
          {isLiveDB ? '📡 Supabase Live Sync' : '💾 Local Caching Sync Active'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        {/* Main Details */}
        <div>
          {/* Client Card */}
          <div className="card" style={{ marginBottom: 'var(--space-6)', border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '24px', color: 'var(--color-charcoal)' }}>
                    {getNormalName()}
                  </h2>
                  <span className={`status-badge ${statusConfig[inquiry.status || 'new'].className}`}>
                    <span className="status-badge__dot" />
                    {statusConfig[inquiry.status || 'new'].label}
                  </span>
                </div>
                <p style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                  Submitted: {getNormalDate()}
                </p>
              </div>

              {/* Status Updater */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Update Intake Stage</label>
                <select
                  className="form-select"
                  value={inquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  style={{ padding: '8px 36px 8px 12px', fontSize: 'var(--text-sm)' }}
                >
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-5)', background: '#FAFBFC', borderRadius: '14px', border: '1.5px solid var(--color-sand)', marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ color: 'var(--color-sage-dark)' }}><Phone size={18} /></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Phone Number</div>
                  <a href={`tel:${inquiry.phone}`} style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)', textDecoration: 'none' }}>
                    {inquiry.phone || '—'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ color: 'var(--color-sage-dark)' }}><Mail size={18} /></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</div>
                  <a href={`mailto:${inquiry.email}`} style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)', textDecoration: 'none' }}>
                    {inquiry.email || '—'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ color: 'var(--color-sage-dark)' }}><User size={18} /></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Preferred Contact</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {inquiry.preferred_contact || inquiry.contactMethod || 'No Preference'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ color: 'var(--color-sage-dark)' }}><MapPin size={18} /></div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Florida Location</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {inquiry.location || 'Florida'}
                  </div>
                </div>
              </div>
            </div>

            {/* Service & Context */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)', marginBottom: 'var(--space-2)' }}>Requested Service</h4>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-sage-dark)' }}>{inquiry.service}</div>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)', marginBottom: 'var(--space-2)' }}>Client Stage / Age Group</h4>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-charcoal)' }}>{inquiry.stage || '—'}</div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)', marginBottom: 'var(--space-2)' }}>Inquiry Message Description</h4>
              <div style={{ padding: 'var(--space-4)', background: '#FAFBFC', borderRadius: '12px', border: '1.5px solid var(--color-sand)', lineHeight: '1.6', color: 'var(--color-charcoal)', fontSize: '15px' }}>
                {inquiry.message}
              </div>
            </div>
          </div>

          {/* Internal Log Notes */}
          <div className="card" style={{ border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} /> Internal Clinical Notes
            </h3>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type follow-up updates, call notes, or therapeutic remarks..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                disabled={isSubmittingNote}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn--primary btn--sm" disabled={isSubmittingNote || !newNote.trim()}>
                <Send size={14} /> Add Note
              </button>
            </form>

            {/* Notes Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {notes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: '10px',
                    border: '1px solid var(--color-sand)',
                    background: note.type === 'system' ? '#FAFBFC' : 'white',
                    borderLeft: note.type === 'system' ? '3px solid var(--color-warm-gray)' : '3px solid var(--color-sage)'
                  }}
                >
                  <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--color-charcoal)' }}>{note.content}</p>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--color-warm-gray-light)', marginTop: 'var(--space-2)', fontWeight: 600 }}>
                    <span>{note.type === 'system' ? 'System Log' : 'Clinical Entry'}</span>
                    <span>•</span>
                    <span>{new Date(note.created_at || note.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div>
          {/* Metadata Card */}
          <div className="card" style={{ border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', color: 'var(--color-charcoal)' }}>
              Intake Checklist
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {getNormalDueDate() && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Calendar size={18} style={{ color: 'var(--color-magenta)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Due Date</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                      {getNormalDueDate()}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Clock size={18} style={{ color: 'var(--color-purple)' }} />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Preferred Timeframe</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {inquiry.preferred_date || inquiry.preferredDate || 'Flexible Schedule'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <ExternalLink size={18} style={{ color: 'var(--color-amber)' }} />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Referral Source</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {inquiry.source || 'Direct Client'}
                  </div>
                </div>
              </div>

              {getNormalConsultDate() && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Calendar size={18} style={{ color: 'var(--color-green)' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-warm-gray-light)', fontWeight: 700, textTransform: 'uppercase' }}>Consultation Date</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                      {getNormalConsultDate()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
