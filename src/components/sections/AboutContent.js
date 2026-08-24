'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  Heart,
  Baby,
  ArrowRight,
  BookOpen,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const credentials = [
  { icon: GraduationCap, text: 'Board-Certified Occupational Therapist' },
  { icon: Award, text: 'Certified Birth & Postpartum Doula' },
  { icon: Shield, text: 'Autism Spectrum Disorder Clinical Specialist' },
  { icon: Baby, text: 'Certified Breastfeeding Counselor' },
  { icon: Heart, text: 'Certified Aroma Therapist' },
];

const workSettings = [
  'Hospitals',
  'Schools',
  'Preschools',
  'Private Practices',
  'Home Settings',
  'Community Settings',
];

export default function AboutContent() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--sage-soft">
        <div className="container">
          <p className="section-label section-label--sage animate-on-scroll">About</p>
          <h1 className="page-header__title animate-on-scroll">Meet Dominique</h1>
          <p className="page-header__subtitle animate-on-scroll">
            The therapist, doula, and advocate behind Dom the OT.
          </p>
        </div>
      </section>

      {/* Hero Bio Section */}
      <section className="section section--cream">
        <div className="container">
          <div className="meet animate-on-scroll">
            <Image
              src="/images/dominique-portrait.png"
              alt="Dominique Alexis — Board-Certified Occupational Therapist and Certified Doula"
              width={400}
              height={500}
              className="meet__image"
              priority
            />
            <div className="meet__content">
              <h2>Dominique &quot;Dom&quot; Alexis</h2>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-sage)',
                  marginBottom: 'var(--space-6)',
                  marginTop: 'var(--space-2)',
                }}
              >
                OTR/L · Certified Birth & Postpartum Doula · Aroma Therapist
              </p>
              <p>
                Dominique &quot;Dom&quot; Alexis is a board-certified occupational therapist based
                in Florida. She has been a pediatric occupational therapist for over 10 years,
                working in hospitals, schools, preschools, and private practices.
              </p>
              <p>
                She is a certified birth & postpartum doula and aroma therapist who offers
                individualized, evidence-based therapy services designed to improve
                participation in daily life from early childhood to young adulthood.
              </p>
              <p>
                As a provider with <strong>Early Steps Treasure Coast</strong>, Dominique
                specializes in early intervention services — meeting families where they are
                and supporting children in the environments where they learn and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section section--white">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--purple">Credentials</p>
            <h2>Education & Certifications</h2>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-12)' }}>
            {credentials.map((cred, i) => (
              <div
                key={cred.text}
                className={`card card--flat animate-on-scroll animate-on-scroll--delay-${(i % 3) + 1}`}
                style={{ textAlign: 'center' }}
              >
                <div
                  className="card__icon card__icon--purple"
                  style={{ margin: '0 auto var(--space-4)' }}
                >
                  <cred.icon size={24} />
                </div>
                <p className="card__title" style={{ fontSize: 'var(--text-base)' }}>
                  {cred.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why I Do This Work */}
      <section className="section section--linen">
        <div className="container container--narrow">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--magenta">Why I Do This Work</p>
            <h2>A Mission Rooted in Equity & Care</h2>
          </div>
          <div className="animate-on-scroll" style={{ marginTop: 'var(--space-10)' }}>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
              Every family deserves access to high-quality, culturally relevant care. That
              belief drives everything I do at Dom the OT.
            </p>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
              Through my work, I&apos;ve seen firsthand how timely intervention can
              transform a child&apos;s trajectory — and how caregiver coaching empowers
              parents to become confident advocates for their children.
            </p>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
              I founded Dom the OT to bridge the gap between clinical expertise and
              compassionate, family-centered care. My goal is to combat structural ableism
              and inequitable systems by delivering services that truly meet families where
              they are.
            </p>
            <blockquote
              style={{
                borderLeft: '4px solid var(--color-sage)',
                paddingLeft: 'var(--space-6)',
                margin: 'var(--space-8) 0',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--color-charcoal)',
              }}
            >
              &quot;Our goal is to help children aged 0 to 21 thrive in home, school,
              and community settings.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Work Settings */}
      <section className="section section--cream">
        <div className="container">
          <div
            className="animate-on-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-16)',
              alignItems: 'center',
            }}
          >
            <div>
              <p className="section-label section-label--amber">Where I Work</p>
              <h2>Meeting Families Where They Are</h2>
              <p style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                Dominique provides services across a range of settings, ensuring every
                child receives support in the environment where they learn and grow best.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {workSettings.map((setting) => (
                  <div
                    key={setting}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    <CheckCircle size={18} color="var(--color-green)" />
                    {setting}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  background: 'var(--color-amber-soft)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: 'var(--space-12)',
                  textAlign: 'center',
                }}
              >
                <BookOpen size={48} color="var(--color-amber)" style={{ margin: '0 auto var(--space-4)' }} />
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Specialized Approaches</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center' }}>
                  {[
                    'Infant Massage',
                    'Primitive Reflex Integration',
                    'Rhythmic Movement Therapy',
                    'Trauma-Informed Care',
                    'Zones of Regulation',
                    'Handwriting Without Tears',
                    'ASD Clinical Specialist',
                  ].map((approach) => (
                    <span key={approach} className="badge badge--amber">
                      {approach}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Ready to Work Together?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Let&apos;s talk about how I can support your child and family with
              personalized, evidence-based care.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Work With Dominique <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
