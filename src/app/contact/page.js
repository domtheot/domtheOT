'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Clock,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const serviceOptions = [
  'Pediatric Occupational Therapy',
  'Doula Services (Birth)',
  'Doula Services (Postpartum)',
  'Early Intervention',
  'Pregnancy Support',
  'Not Sure — I\'d Like Guidance',
];

const stageOptions = [
  'Currently Pregnant',
  'Planning Pregnancy',
  'Postpartum (0–3 months)',
  'Postpartum (3–12 months)',
  'Child (1–5 years)',
  'Child (5–12 years)',
  'Adolescent (12–21 years)',
  'Not Applicable',
];

const contactMethods = ['Phone', 'Email', 'Text', 'No Preference'];

const sourceOptions = [
  'Google Search',
  'Social Media',
  'Friend / Family Referral',
  'Healthcare Provider',
  'Early Steps',
  'Other',
];

export default function ContactPage() {
  const scrollRef = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Check honeypot
    if (data.website) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        // Save to local storage for persistent browser state fallback
        try {
          const localInqs = JSON.parse(localStorage.getItem('dom_inquiries') || '[]');
          localInqs.push({
            id: result.inquiryId || `local-${Date.now()}`,
            name: `${data.firstName} ${data.lastName}`,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            service: data.service,
            status: 'new',
            date: new Date().toISOString().split('T')[0],
            created_at: new Date().toISOString(),
            dueDate: data.dueDate || '',
            source: data.source || 'Direct',
            message: data.message,
            consent: !!data.consent
          });
          localStorage.setItem('dom_inquiries', JSON.stringify(localInqs));
        } catch (e) {
          console.error('Failed to cache inquiry locally:', e);
        }
        setSubmitted(true);
      } else {
        alert(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div ref={scrollRef}>
        <section className="page-header section--sage-soft" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container container--narrow text-center">
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-sage-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
              }}
            >
              <CheckCircle size={40} color="var(--color-sage)" />
            </div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
              Your Inquiry Has Been Received
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-warm-gray)', marginBottom: 'var(--space-6)', maxWidth: '500px', margin: '0 auto var(--space-8)' }}>
              Thank you for reaching out to Dom the OT. Dominique will review your
              inquiry and be in touch soon. You&apos;ll receive a confirmation email shortly.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn--primary">
                Return Home
              </Link>
              <Link href="/resources" className="btn btn--secondary">
                Explore Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--sage-soft">
        <div className="container">
          <p className="section-label section-label--sage animate-on-scroll">Contact</p>
          <h1 className="page-header__title animate-on-scroll">
            Request a Consultation
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Tell us about your family&apos;s needs and Dominique will be in touch
            to discuss how she can help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section--cream">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <form onSubmit={handleSubmit} className="animate-on-scroll">
              <div className="card" style={{ padding: 'var(--space-10)' }}>
                <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                  Inquiry Form
                </h2>
                <p style={{ color: 'var(--color-warm-gray)', marginBottom: 'var(--space-8)' }}>
                  All information is kept private and secure.
                </p>

                {/* Honeypot */}
                <div className="hp-field">
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex="-1" autoComplete="off" />
                </div>

                {/* Name Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label form-label--required">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      required
                      placeholder="First name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label form-label--required">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      required
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label form-label--required">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                {/* Preferred Contact & Service */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="contactMethod" className="form-label">
                      Preferred Contact Method
                    </label>
                    <select id="contactMethod" name="contactMethod" className="form-select">
                      <option value="">Select...</option>
                      {contactMethods.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label form-label--required">
                      Service Interested In
                    </label>
                    <select id="service" name="service" className="form-select" required>
                      <option value="">Select a service...</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stage & Due Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="stage" className="form-label">
                      Stage / Age of Child
                    </label>
                    <select id="stage" name="stage" className="form-select">
                      <option value="">Select if applicable...</option>
                      {stageOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dueDate" className="form-label">
                      Expected Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Location & Source */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-input"
                      placeholder="City, State"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="source" className="form-label">
                      How Did You Hear About Us?
                    </label>
                    <select id="source" name="source" className="form-select">
                      <option value="">Select...</option>
                      {sourceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label form-label--required">
                    Tell Us About Your Needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    required
                    placeholder="Share a brief description of what support you're looking for..."
                    rows="4"
                  />
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label htmlFor="preferredDate" className="form-label">
                    Preferred Consultation Date/Time
                  </label>
                  <input
                    type="text"
                    id="preferredDate"
                    name="preferredDate"
                    className="form-input"
                    placeholder="e.g., Weekday mornings, Tuesday after 2pm"
                  />
                </div>

                {/* Consent */}
                <div className="form-group">
                  <label className="form-checkbox">
                    <input type="checkbox" name="consent" required />
                    <span className="form-checkbox-label">
                      I consent to Dom the OT collecting this information to respond
                      to my inquiry. I understand my information will be kept private
                      and secure.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn btn--primary btn--lg btn--full ${isSubmitting ? 'btn--loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit My Inquiry'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </div>
            </form>

            {/* Sidebar */}
            <div className="animate-on-scroll animate-on-scroll--delay-2" style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-6))' }}>
              {/* Contact Info Card */}
              <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                  <a
                    href="tel:+17863906614"
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-charcoal)' }}
                  >
                    <div className="card__icon card__icon--sage" style={{ width: '40px', height: '40px', marginBottom: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>(786) 390-6614</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>Call or text</p>
                    </div>
                  </a>
                  <a
                    href="mailto:DOMTHEOT@GMAIL.COM"
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-charcoal)' }}
                  >
                    <div className="card__icon card__icon--purple" style={{ width: '40px', height: '40px', marginBottom: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>DOMTHEOT@GMAIL.COM</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>Email anytime</p>
                    </div>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div className="card__icon card__icon--amber" style={{ width: '40px', height: '40px', marginBottom: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Florida</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>Treasure Coast area</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div className="card__icon card__icon--magenta" style={{ width: '40px', height: '40px', marginBottom: 0 }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Response Time</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warm-gray)' }}>Within 24–48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div className="card">
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
                  Connect With Us
                </h3>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {[
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Youtube, label: 'YouTube' },
                    { Icon: Linkedin, label: 'LinkedIn' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-link"
                      style={{ background: 'var(--color-linen)', color: 'var(--color-warm-gray)' }}
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
