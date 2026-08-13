'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Doula Clients', 'OT Clients', 'Pregnancy Support', 'Postpartum Support'];

const testimonials = [
  {
    name: 'Sarah M.',
    category: 'OT Clients',
    service: 'Pediatric OT — Sensory Processing',
    quote:
      'Dominique has a gift for making both children and parents feel completely at ease. Her expertise in occupational therapy combined with her warm, nurturing approach transformed our family\'s daily routines. Our son now participates in activities he used to avoid entirely.',
    color: 'green',
  },
  {
    name: 'Jessica R.',
    category: 'Doula Clients',
    service: 'Birth Doula Support',
    quote:
      'Having Dominique as our doula was the best decision we made during our pregnancy. Her calm presence and knowledge made all the difference during birth and those first weeks at home. She helped my partner feel confident and included in every step.',
    color: 'sage',
  },
  {
    name: 'Michael T.',
    category: 'OT Clients',
    service: 'Early Intervention',
    quote:
      'Dom helped our son develop fine motor skills that his school therapist said would take months. Her individualized approach and the way she connects with children is truly special. We saw progress within weeks.',
    color: 'green',
  },
  {
    name: 'Amanda L.',
    category: 'Postpartum Support',
    service: 'Postpartum Doula & OT',
    quote:
      'As a first-time mom, I felt overwhelmed. Dominique helped me establish routines that actually worked for our family. Her unique combination of doula care and occupational therapy expertise meant she could help me with everything from recovery to my baby\'s development.',
    color: 'purple',
  },
  {
    name: 'David & Keisha W.',
    category: 'Pregnancy Support',
    service: 'Prenatal & Birth Support',
    quote:
      'Dominique supported us throughout our entire pregnancy journey. She educated us on what to expect, helped us prepare our birth preferences, and was an incredible advocate during delivery. We couldn\'t have done it without her.',
    color: 'amber',
  },
  {
    name: 'Rachel K.',
    category: 'OT Clients',
    service: 'Handwriting & Fine Motor',
    quote:
      'My daughter struggled with handwriting for years. After working with Dominique using the Handwriting Without Tears approach, her writing improved dramatically. More importantly, she gained confidence in school and actually enjoys writing now.',
    color: 'green',
  },
  {
    name: 'Tanya S.',
    category: 'Doula Clients',
    service: 'Birth & Postpartum Doula',
    quote:
      'Dominique\'s presence during our birth was everything. She was calm when things got intense, supportive without being overbearing, and so knowledgeable. Her postpartum visits afterwards helped us transition into parenthood with confidence.',
    color: 'sage',
  },
  {
    name: 'Carlos & Maria G.',
    category: 'Postpartum Support',
    service: 'Family-Centered OT',
    quote:
      'What makes Dom the OT different is that she works with the whole family. She coached us on strategies we could use every day, and our child\'s growth has been remarkable. We feel empowered as parents.',
    color: 'purple',
  },
];

export default function StoriesPage() {
  const scrollRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = testimonials.filter(
    (t) => activeCategory === 'All' || t.category === activeCategory
  );

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--linen">
        <div className="container">
          <p className="section-label animate-on-scroll">Client Stories</p>
          <h1 className="page-header__title animate-on-scroll">
            Families Who&apos;ve Worked With Dominique
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Read what families have to say about their experience with Dom the OT.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section section--cream" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="filter-pills animate-on-scroll" style={{ justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'filter-pill--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid grid--2">
            {filtered.map((testimonial, i) => (
              <div
                key={i}
                className={`card card--testimonial card--service card--${testimonial.color} animate-on-scroll animate-on-scroll--delay-${(i % 2) + 1}`}
              >
                <div style={{ display: 'flex', gap: '2px', marginBottom: 'var(--space-4)' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="var(--color-amber)"
                      color="var(--color-amber)"
                    />
                  ))}
                </div>
                <p className="card__quote">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="card__author">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-full)',
                      background: `var(--color-${testimonial.color}-soft)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: `var(--color-${testimonial.color})`,
                      fontWeight: 700,
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="card__author-name">{testimonial.name}</div>
                    <div className="card__author-role">{testimonial.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Ready to Write Your Own Story?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Join the families who&apos;ve experienced the difference that personalized,
              compassionate care can make.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Request a Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
