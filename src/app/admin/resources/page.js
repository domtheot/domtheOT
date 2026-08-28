'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Link2 } from 'lucide-react';

const demoResources = [
  {
    id: 1,
    title: 'Understanding Sensory Processing in Children',
    category: 'Occupational Therapy',
    description: 'A comprehensive guide for parents to identify and support sensory processing needs at home.',
    content: 'Sensory processing refers to the way the nervous system receives messages from the senses and turns them into responses. For children with sensory processing differences, processing sensory information (like sights, sounds, textures, and balance) can be challenging. In this guide, we discuss practical home-based strategies such as creating a sensory-friendly space, utilizing heavy work activities, and establishing predictable sensory routines that support daily functioning.',
    published: true,
    createdAt: '2026-08-01', link_url: '', featured_link: true
  },
  {
    id: 2,
    title: 'Preparing for Your Birth Experience',
    category: 'Birth',
    description: 'Empowering steps to help you prepare emotionally, physically, and practically for delivery day.',
    content: 'Preparing for birth involves understanding your options, building a trusted support team, and preparing your body and mind. As your doula, I recommend starting with a flexible birth preferences plan, practicing relaxation breathing techniques, and involving your partner in comfort measures (like counterpressure and massage). Remember that birth is a physiological process that unfolds best when you feel safe, supported, and respected.',
    published: true,
    createdAt: '2026-07-28', link_url: '', featured_link: true
  },
  {
    id: 3,
    title: 'Building Postpartum Routines That Work',
    category: 'Postpartum',
    description: 'Practical scheduling and occupational tips for adjustment and recovery during the fourth trimester.',
    content: 'The postpartum period, often called the fourth trimester, is a time of immense physical, emotional, and social transition. To establish healthy routines, prioritize rest, nutrition, and boundaries. From an occupational therapy perspective, we look at pacing daily activities, simplifying household tasks, and structuring routines around baby care and self-care to ensure you recover sustainably and bond deeply with your newborn.',
    published: true,
    createdAt: '2026-07-20', link_url: '', featured_link: true
  },
  {
    id: 4,
    title: 'Fine Motor Development Milestones',
    category: 'Infant Development',
    description: 'A checklist of hand and finger coordination milestones from birth through preschool age.',
    content: 'Fine motor skills involve the coordination of small muscles in the hands and fingers. Milestones span from early reflex grasping in newborns to building blocks, scribbling, cutting with safety scissors, and buttoning shirts as toddlers grow. We cover what developmental signs to look for and interactive play ideas — like playdough, bead-stringing, and pegboards — to naturally encourage fine motor strength and finger isolation.',
    published: false,
    createdAt: '2026-08-10', link_url: '', featured_link: false
  },
  {
    id: 5,
    title: 'What Does a Doula Actually Do?',
    category: 'Pregnancy',
    description: 'Demystifying the role of a birth doula, doula support boundaries, and benefits during labor.',
    content: 'A birth doula is a trained professional who provides continuous physical, emotional, and informational support to a mother before, during, and shortly after childbirth. Unlike medical staff, a doula focuses entirely on your comfort, advocacy, and reassurance. Research consistently shows that doula support reduces medical intervention rates, shortens labor times, and significantly improves the mother’s overall birth satisfaction.',
    published: true,
    createdAt: '2026-07-15', link_url: '', featured_link: true
  }
];

const categories = ['Pregnancy', 'Birth', 'Postpartum', 'Occupational Therapy', 'Parenting', 'Infant Development', 'Maternal Wellness'];

export default function AdminResourcesPage() {
  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', description: '', content: '', published: true, link_url: '', featured_link: false });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await fetch('/api/resources');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setResources(result.data || []);
        localStorage.setItem('dom_resources', JSON.stringify(result.data || []));
        return;
      } catch (error) {
        console.warn('Using locally saved resources:', error);
      }
      const saved = localStorage.getItem('dom_resources');
      try { setResources(saved ? JSON.parse(saved) : demoResources); }
      catch { setResources(demoResources); }
    }
    loadResources();
  }, []);

  // Save to Local Storage whenever resources change
  const saveResources = (newResources) => {
    setResources(newResources);
    localStorage.setItem('dom_resources', JSON.stringify(newResources));
  };

  const handleSave = async () => {
    if (!form.title || !form.category) return;
    if (form.featured_link && resources.filter((r) => r.featured_link && r.id !== editingId).length >= 5) {
      setMessage('You can designate up to five quick-reference links. Remove one before adding another.');
      return;
    }
    let optimistic;
    if (editingId) {
      optimistic = resources.map((r) =>
        r.id === editingId ? { ...r, ...form } : r
      );
    } else {
      optimistic = [
        ...resources,
        {
          ...form,
          id: `local-${form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${resources.length + 1}`,
          createdAt: 'Local draft'
        }
      ];
    }
    try {
      const response = await fetch(editingId ? `/api/resources/${editingId}` : '/api/resources', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      const next = editingId
        ? resources.map((r) => r.id === editingId ? result.data : r)
        : [...resources, result.data];
      saveResources(next);
      setMessage('Resource saved and connected to the public Resources page.');
    } catch (error) {
      saveResources(optimistic);
      setMessage(`Saved in this browser. Database sync unavailable: ${error.message}`);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: '', category: '', description: '', content: '', published: true, link_url: '', featured_link: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (resource) => {
    setForm({
      title: resource.title,
      category: resource.category,
      description: resource.description || '',
      content: resource.content || '',
      published: resource.published,
      link_url: resource.link_url || '',
      featured_link: !!resource.featured_link
    });
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const filtered = resources.filter((r) => r.id !== id);
      saveResources(filtered);
      try { await fetch(`/api/resources/${id}`, { method: 'DELETE' }); } catch {}
    }
  };

  const togglePublish = async (id) => {
    const updated = resources.map((r) => 
      r.id === id ? { ...r, published: !r.published } : r
    );
    saveResources(updated);
    const resource = updated.find((r) => r.id === id);
    try { await fetch(`/api/resources/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: resource.published }) }); } catch {}
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">Resources Hub CMS</h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
            {resources.length} articles · {resources.filter((r) => r.published).length} published
          </p>
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={14} /> Add New Article
        </button>
      </div>

      {message && <div className="admin-notice" role="status">{message}</div>}

      {/* Editor Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--space-6)', border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', color: 'var(--color-charcoal)' }}>
            {editingId ? '📝 Edit Resource Article' : '✨ Compose New Resource Article'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label">Article Title</label>
              <input 
                type="text" 
                className="form-input" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                placeholder="e.g. Fine Motor Skills Activities" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-select" 
                value={form.category} 
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category...</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label">Brief Description (Excerpt)</label>
            <textarea 
              className="form-textarea" 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              placeholder="Provide a short sentence summarizing this article for the hub card list..." 
              rows="2" 
            />
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
            <label className="form-label">Article Content (Full Text Information & Language)</label>
            <textarea 
              className="form-textarea" 
              value={form.content} 
              onChange={(e) => setForm({ ...form, content: e.target.value })} 
              placeholder="Write the full body copy, advice, guidelines, and educational content here..." 
              rows="8" 
              style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-4)', alignItems: 'end', marginBottom: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label">Destination Link (optional)</label>
              <input type="url" className="form-input" value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="https://example.com/helpful-guide" />
            </div>
            <label className="resource-feature-toggle">
              <input type="checkbox" checked={form.featured_link} onChange={(e) => setForm({ ...form, featured_link: e.target.checked })} />
              <span>Designate as quick reference</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <button className="btn btn--primary btn--sm" onClick={handleSave}>
              {editingId ? 'Save Changes' : 'Publish Article'}
            </button>
            <button className="btn btn--ghost btn--sm" onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>{r.title}</td>
                <td><span className="badge badge--charcoal">{r.category}</span></td>
                <td>
                  <span className={`status-badge ${r.published ? 'status-badge--client' : 'status-badge--archived'}`}>
                    <span className="status-badge__dot" />
                    {r.published ? 'Published' : 'Draft'}
                  </span>
                  {r.featured_link && <span className="reference-marker"><Link2 size={12} /> Reference</span>}
                </td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-warm-gray)' }}>{r.createdAt || r.created_at?.slice(0, 10)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                    <button 
                      className="btn btn--ghost btn--sm" 
                      onClick={() => handleEdit(r)} 
                      aria-label="Edit"
                      title="Edit content details"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className="btn btn--ghost btn--sm" 
                      onClick={() => togglePublish(r.id)} 
                      aria-label={r.published ? 'Unpublish' : 'Publish'}
                      title={r.published ? 'Switch to Draft' : 'Switch to Published'}
                    >
                      {r.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button 
                      className="btn btn--ghost btn--sm" 
                      onClick={() => handleDelete(r.id)} 
                      aria-label="Delete" 
                      style={{ color: 'var(--color-error)' }}
                      title="Delete article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-warm-gray)' }}>
                  No resources added yet. Click &quot;Add New Article&quot; to begin!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
