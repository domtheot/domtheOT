'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';

const demoFaqs = [
  { id: 1, question: 'What exactly does a doula do?', answer: 'A doula provides continuous physical, emotional, and informational support before, during, and shortly after childbirth to help you achieve the safest, most satisfying birth experience possible.', category: 'Doula Services', published: true, order: 1 },
  { id: 2, question: 'What is pediatric occupational therapy?', answer: 'Pediatric OT helps children develop the skills they need for the job of living, which includes playing, socializing, self-care, writing, and fine motor tasks.', category: 'Occupational Therapy', published: true, order: 2 },
  { id: 3, question: 'How do I know if my child needs OT?', answer: 'Signs include difficulty with fine or gross motor coordination, writing difficulties, developmental delay markers, sensory sensitivities, or challenges with self-care routines.', category: 'Occupational Therapy', published: true, order: 3 },
  { id: 4, question: 'What ages do you serve?', answer: 'We provide developmental and occupational therapy services for children and young adults from infancy (0) up to age 21.', category: 'Occupational Therapy', published: true, order: 4 },
  { id: 5, question: 'How do I schedule a consultation?', answer: 'You can submit an inquiry through our contact form. Dominique will review your request and call or email you to schedule a 15-minute phone screening.', category: 'Scheduling', published: true, order: 5 },
  { id: 6, question: 'Do you accept insurance?', answer: 'We operate as an out-of-network provider and can provide superbills for you to submit to your insurance company for reimbursement. Please contact us to discuss details.', category: 'Payments', published: true, order: 6 },
];

const faqCategories = ['Doula Services', 'Occupational Therapy', 'Pregnancy', 'Birth', 'Postpartum', 'Scheduling', 'Payments', 'Service Area'];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', category: '', published: true });

  // Load from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dom_faqs');
    if (saved) {
      try {
        setFaqs(JSON.parse(saved));
      } catch (e) {
        setFaqs(demoFaqs);
      }
    } else {
      setFaqs(demoFaqs);
    }
  }, []);

  // Save changes to Local Storage
  const saveFaqs = (newList) => {
    setFaqs(newList);
    localStorage.setItem('dom_faqs', JSON.stringify(newList));
  };

  const handleSave = () => {
    if (!form.question || !form.answer || !form.category) return;
    if (editingId) {
      const updated = faqs.map((f) => 
        f.id === editingId ? { ...f, ...form } : f
      );
      saveFaqs(updated);
    } else {
      const added = [...faqs, { ...form, id: Date.now(), order: faqs.length + 1 }];
      saveFaqs(added);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ question: '', answer: '', category: '', published: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer, category: faq.category, published: faq.published });
    setEditingId(faq.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      const filtered = faqs.filter((f) => f.id !== id);
      saveFaqs(filtered);
    }
  };

  const togglePublish = (id) => {
    const updated = faqs.map((f) => 
      f.id === id ? { ...f, published: !f.published } : f
    );
    saveFaqs(updated);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-header__title">FAQs CMS</h1>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
            {faqs.length} questions · {faqs.filter((f) => f.published).length} published
          </p>
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--space-6)', border: '2px solid var(--color-sand)', boxShadow: '0 4px 0 var(--color-sand)' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', color: 'var(--color-charcoal)' }}>
            {editingId ? '📝 Edit FAQ Entry' : '✨ Add New FAQ Entry'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label">Question</label>
              <input type="text" className="form-input" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="e.g. What exactly does a doula do?" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select Category...</option>
                {faqCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 'var(--space-5)' }}>
            <label className="form-label">Answer</label>
            <textarea className="form-textarea" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Provide the detailed answer guidelines..." rows="4" style={{ lineHeight: '1.6' }} />
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
              <th style={{ width: '40px' }}></th>
              <th>Question</th>
              <th>Category</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td><GripVertical size={14} color="var(--color-warm-gray-light)" /></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '2px' }}>{faq.question}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {faq.answer}
                  </div>
                </td>
                <td><span className="badge badge--sage">{faq.category}</span></td>
                <td>
                  <span className={`status-badge ${faq.published ? 'status-badge--client' : 'status-badge--archived'}`}>
                    <span className="status-badge__dot" />{faq.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleEdit(faq)} title="Edit FAQ"><Edit2 size={14} /></button>
                    <button className="btn btn--ghost btn--sm" onClick={() => togglePublish(faq.id)} title={faq.published ? 'Unpublish FAQ' : 'Publish FAQ'}>
                      {faq.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => handleDelete(faq.id)} style={{ color: 'var(--color-error)' }} title="Delete FAQ"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-warm-gray)' }}>
                  No FAQs added yet. Click &quot;Add FAQ&quot; to begin!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
