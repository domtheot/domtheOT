'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star } from 'lucide-react';

const demoTestimonials = [
  { id: 1, name: 'Sarah M.', service: 'Pediatric OT — Sensory Processing', category: 'OT Clients', quote: 'Dominique has a gift for making both children and parents feel completely at ease. Her clinical knowledge combined with her warm personality helped our son make incredible strides in his sensory integration and daily routines.', published: true, featured: true },
  { id: 2, name: 'Jessica R.', service: 'Birth Doula Support', category: 'Doula Clients', quote: 'Having Dominique as our doula was the best decision we made. She provided calm, evidence-based guidance throughout my labor, and her physical comfort techniques made all the difference in achieving the birth experience we hoped for.', published: true, featured: false },
  { id: 3, name: 'Michael T.', service: 'Early Intervention', category: 'OT Clients', quote: 'Dom helped our son develop the fine motor coordination and confidence he needed for preschool. She made every therapy session feel like play, and we looked forward to her visits every week.', published: true, featured: true },
  { id: 4, name: 'Amanda L.', service: 'Postpartum Doula & OT', category: 'Postpartum Support', quote: 'As a first-time mom, I felt completely overwhelmed in the early weeks. Dom stepped in with practical scheduling advice and emotional reassurance that helped our whole family settle into a healthy, rest-filled routine.', published: true, featured: false },
];

const serviceCategories = ['Doula Clients', 'OT Clients', 'Pregnancy Support', 'Postpartum Support'];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', service: '', category: '', quote: '', published: true, featured: false });

  // Load from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dom_testimonials');
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (e) {
        setTestimonials(demoTestimonials);
      }
    } else {
      setTestimonials(demoTestimonials);
    }
  }, []);

  // Save changes to Local Storage
  const saveTestimonials = (newList) => {
    setTestimonials(newList);
    localStorage.setItem('dom_testimonials', JSON.stringify(newList));
  };

  const handleSave = () => {
    if (!form.name || !form.quote) return;
    if (editingId) {
      const updated = testimonials.map((t) => 
        t.id === editingId ? { ...t, ...form } : t
      );
      saveTestimonials(updated);
    } else {
      const added = [...testimonials, { ...form, id: Date.now() }];
      saveTestimonials(added);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', service: '', category: '', quote: '', published: true, featured: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, service: t.service, category: t.category, quote: t.quote, published: t.published, featured: t.featured });
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const filtered = testimonials.filter((t) => t.id !== id);
      saveTestimonials(filtered);
    }
  };

  const togglePublish = (id) => {
    const updated = testimonials.map((t) => 
      t.id === id ? { ...t, published: !t.published } : t
    );
    saveTestimonials(updated);
  };

  const toggleFeatured = (id) => {
    const updated = testimonials.map((t) => 
      t.id === id ? { ...t, featured: !t.featured } : t
    );
    saveTestimonials(updated);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Testimonials CMS</h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
            {testimonials.length} reviews · {testimonials.filter((t) => t.featured).length} featured on homepage
          </p>
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--space-6)', border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', color: 'var(--color-charcoal)' }}>
            {editingId ? '📝 Edit Client Testimonial' : '✨ Add New Client Testimonial'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label">Client Name</label>
              <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sarah M." />
            </div>
            <div className="form-group">
              <label className="form-label">Service Received</label>
              <input type="text" className="form-input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="e.g. Pediatric OT Support" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select Category...</option>
                {serviceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label">Testimonial Quote</label>
            <textarea className="form-textarea" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Paste client feedback quote here..." rows="4" style={{ lineHeight: '1.6' }} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
            <label className="form-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              <span className="form-checkbox-label" style={{ fontWeight: 600 }}>Published</span>
            </label>
            <label className="form-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              <span className="form-checkbox-label" style={{ fontWeight: 600 }}>Featured on homepage</span>
            </label>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn--primary btn--sm" onClick={handleSave}>{editingId ? 'Save Changes' : 'Create'}</button>
            <button className="btn btn--ghost btn--sm" onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>{t.name}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{t.service}</td>
                <td><span className="badge badge--sage">{t.category}</span></td>
                <td>
                  <span className={`status-badge ${t.published ? 'status-badge--client' : 'status-badge--archived'}`}>
                    <span className="status-badge__dot" />{t.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <button className="btn btn--ghost btn--sm" onClick={() => toggleFeatured(t.id)} style={{ color: t.featured ? 'var(--color-amber)' : 'var(--color-warm-gray-light)' }} title={t.featured ? 'Remove from homepage feature' : 'Feature on homepage'}>
                    <Star size={16} fill={t.featured ? 'var(--color-amber)' : 'none'} />
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleEdit(t)} title="Edit review"><Edit2 size={14} /></button>
                    <button className="btn btn--ghost btn--sm" onClick={() => togglePublish(t.id)} title={t.published ? 'Unpublish review' : 'Publish review'}>
                      {t.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleDelete(t.id)} style={{ color: 'var(--color-error)' }} title="Delete review"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-warm-gray)' }}>
                  No testimonials added yet. Click &quot;Add Testimonial&quot; to begin!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
