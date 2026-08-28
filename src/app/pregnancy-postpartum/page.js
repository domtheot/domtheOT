'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  Baby,
  Sun,
  Moon,
  Home,
  Flower2,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const timelinePhases = [
  {
    color: 'sage',
    icon: Flower2,
    title: 'Pregnancy',
    subtitle: 'Building the Foundation',
    description:
      'Education, preparation, and support from the moment you begin your journey. Dominique helps you navigate the physical and emotional changes of pregnancy with practical guidance and compassionate care.',
    details: [
      'Prenatal education & birth preparation',
      'Emotional support & stress management',
      'Building daily routines that support your well-being',
      'Partner preparation & family readiness',
      'Understanding your options & making informed decisions',
    ],
  },
  {
    color: 'green',
    icon: Heart,
    title: 'Preparing for Birth',
    subtitle: 'Getting Ready Together',
    description:
      'Birth preferences, partner coaching, understanding your options, and creating a plan that reflects your values and needs.',
    details: [
      'Birth preferences & planning',
      'Partner coaching & involvement',
      'Comfort measures & relaxation techniques',
      'Communication with your care team',
      'Aroma therapy for comfort & relaxation',
    ],
  },
  {
    color: 'amber',
    icon: Baby,
    title: 'Birth',
    subtitle: 'Continuous Support When It Matters Most',
    description:
      'Dominique provides continuous doula support during labor and delivery — offering physical comfort, emotional reassurance, and advocacy for your birth preferences.',
    details: [
      'Continuous labor support',
      'Comfort measures & breathing techniques',
      'Advocacy for your birth preferences',
      'Partner support & coaching',
      'Immediate postpartum bonding support',
    ],
  },
  {
    color: 'purple',
    icon: Moon,
    title: 'Early Postpartum',
    subtitle: 'The First Weeks',
    description:
      'Recovery support, newborn care guidance, establishing feeding and sleep routines, and emotional check-ins during those transformative early weeks.',
    details: [
      'Recovery support & self-care',
      'Newborn care & feeding guidance',
      'Sleep routines & strategies',
      'Emotional well-being check-ins',
      'Identifying concerns & connecting with resources',
    ],
  },
  {
    color: 'magenta',
    icon: Home,
    title: 'Returning to Daily Life',
    subtitle: 'Building Sustainable Routines',
    description:
      'Helping parents transition into sustainable routines and family life. This is where Dominique\'s OT expertise becomes especially powerful — supporting the functional aspects of parenthood.',
    details: [
      'Establishing sustainable family routines',
      'Returning to work or daily activities',
      'Child development milestones & guidance',
      'Ongoing support & resource connections',
      'Building confidence as a parent',
    ],
  },
];

export default function PregnancyPostpartumPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--magenta-soft">
        <div className="container">
          <p className="section-label section-label--magenta animate-on-scroll">
            Pregnancy & Postpartum
          </p>
          <h1 className="page-header__title animate-on-scroll">
            Support for Every Stage of Your Journey
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            From pregnancy through postpartum and into daily family life —
            compassionate, expert support at every step.
          </p>
          <div style={{ marginTop: 'var(--space-8)' }} className="animate-on-scroll">
            <Link href="/contact" className="btn btn--magenta btn--lg">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--cream">
        <div className="container container--narrow text-center animate-on-scroll">
          <p className="section-label">The Journey</p>
          <h2>A Holistic Approach to Parenthood</h2>
          <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
            Becoming a parent transforms every aspect of your daily life. Dominique
            combines her certified doula training with over 10 years of occupational
            therapy expertise to support families not just through birth, but through
            the functional transitions of parenthood — routines, development, and
            everyday life.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--white">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--sage">Your Journey</p>
            <h2>From Pregnancy to Parenthood</h2>
          </div>

          <div className="timeline animate-on-scroll" style={{ marginTop: 'var(--space-12)', maxWidth: '800px' }}>
            {timelinePhases.map((phase) => (
              <div key={phase.title} className="timeline__item">
                <div className={`timeline__dot timeline__dot--${phase.color}`} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <phase.icon size={20} color={`var(--color-${phase.color})`} />
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: `var(--color-${phase.color})`,
                    }}
                  >
                    {phase.subtitle}
                  </p>
                </div>
                <h3 className="timeline__title">{phase.title}</h3>
                <p className="timeline__description">{phase.description}</p>
                <ul
                  style={{
                    marginTop: 'var(--space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  {phase.details.map((detail) => (
                    <li
                      key={detail}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-2)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-warm-gray)',
                      }}
                    >
                      <Sun size={14} color={`var(--color-${phase.color})`} style={{ marginTop: '3px', flexShrink: 0 }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Value */}
      <section className="section section--charcoal">
        <div className="container container--narrow text-center animate-on-scroll">
          <p className="section-label" style={{ color: 'var(--color-magenta)' }}>
            Why Dom the OT
          </p>
          <h2>More Than Doula Care. More Than Therapy.</h2>
          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Most doulas support you through birth. Most therapists see you in a clinic.
            Dominique does both — walking alongside your family from pregnancy through
            daily life, combining clinical expertise with heartfelt, personalized care.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Start Your Journey with Support</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Whether you&apos;re expecting, just had a baby, or navigating the
              beautiful chaos of parenthood — Dominique is here for you.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Request a Consultation <ArrowRight size={16} />
              </Link>
              <a href="tel:+17863906614" className="btn btn--secondary btn--lg">
                Text/Call (786) 390-6614
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
