'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Dom+the+OT%2C+LLC+google+reviews#lrd=0x8bc154c5ec5fe723:0xd4578351a5c50e8f,1,,,,';

const testimonials = [
  {
    name: 'Josselyn Casaleno',
    quote:
      'Ms Dom! One of the best OT therapists I know! Very attentive, caring, and patient—with my son and myself. She is very knowledgeable in her field and tackles every concern and question with so much grace and confidence.',
    color: 'green',
  },
  {
    name: 'Nethania Milhomme',
    quote:
      'Our son worked with Dominique for over two years, and we can\'t say enough good things. From the first session, she found a way to connect with him, met him where he was, kept things playful, and he actually looked forward to going.',
    color: 'sage',
  },
  {
    name: 'Heather Dallass',
    quote:
      'Dom the OT worked with my son for about four years. We started with her at Joe DiMaggio in Wellington. We couldn\'t let her go, so we hired her for in-home occupational therapy.',
    color: 'purple',
  },
  {
    name: 'Julie Sarfati',
    quote:
      'I have known Dom for many years and have the pleasure to work with her. I am a speech therapist and we have shared many clients together over the years. She is an incredible OT who truly puts her clients first.',
    color: 'amber',
  },
];

export default function StoriesPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <section className="page-header section--linen">
        <div className="container">
          <p className="section-label animate-on-scroll">Verified Google Reviews</p>
          <h1 className="page-header__title animate-on-scroll">
            What Families and Colleagues Say
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Real feedback shared on the official Dom the OT, LLC Google Business listing.
          </p>
          <div className="animate-on-scroll" style={{ marginTop: 'var(--space-6)' }}>
            <a
              href={GOOGLE_REVIEWS_URL}
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              5.0 <Star size={16} fill="var(--color-amber)" color="var(--color-amber)" />
              from 30 Google reviews <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="grid grid--2">
            {testimonials.map((testimonial, i) => (
              <article
                key={testimonial.name}
                className={`card card--testimonial card--service card--${testimonial.color} animate-on-scroll animate-on-scroll--delay-${(i % 2) + 1}`}
              >
                <div style={{ display: 'flex', gap: '2px', marginBottom: 'var(--space-4)' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="var(--color-amber)" color="var(--color-amber)" />
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
                      flexShrink: 0,
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="card__author-name">{testimonial.name}</div>
                    <a
                      className="card__author-role"
                      href={GOOGLE_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Verified Google review <ExternalLink size={12} style={{ display: 'inline' }} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center animate-on-scroll" style={{ marginTop: 'var(--space-10)' }}>
            <a href={GOOGLE_REVIEWS_URL} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              View All Reviews on Google <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Ready to Get Started?</h2>
            <p className="subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
              Learn how Dominique can support your child and family with personalized, compassionate care.
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
