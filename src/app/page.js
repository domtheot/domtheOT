'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  HandHeart,
  Brain,
  Baby,
  ArrowRight,
  Star,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'Occupational Therapy',
    tag: 'Pediatric OT',
    description:
      'Evidence-based pediatric OT helping children ages 0–21 develop the skills they need to thrive at home, school, and in the community.',
    logoIcon: '/images/icon-logo-child.png',
    color: 'green',
    href: '/occupational-therapy',
  },
  {
    title: 'Daily Life & Development',
    tag: 'Daily Skills',
    description:
      'Supporting hygiene, self-care routines, and functional independence through family-centered, practical guidance.',
    logoIcon: '/images/icon-logo-hand.png',
    color: 'amber',
    href: '/occupational-therapy',
  },
  {
    title: 'Early Intervention',
    tag: 'Early Childhood',
    description:
      'Timely, culturally relevant services for infants and toddlers with developmental delays or special needs.',
    logoIcon: '/images/icon-logo-cube.png',
    color: 'purple',
    href: '/occupational-therapy',
  },
  {
    title: 'Sensory Processing',
    tag: 'Sensory Support',
    description:
      'Helping children regulate sensory input to improve attention, behavior, and participation in everyday activities.',
    logoIcon: '/images/icon-logo-swing.png',
    color: 'magenta',
    href: '/occupational-therapy',
  },
  {
    title: 'Doula & Birth Support',
    tag: 'Maternal Care',
    description:
      'Certified birth and postpartum doula services providing compassionate care before, during, and after pregnancy.',
    icon: Heart,
    color: 'sage',
    href: '/doula-services',
  },
];

const differentiators = [
  {
    icon: Shield,
    title: '10+ Years of Experience',
    description: 'A decade of pediatric OT across hospitals, schools, preschools, and private practices.',
  },
  {
    icon: HandHeart,
    title: 'OT + Doula Combined',
    description: 'A unique blend of occupational therapy expertise and certified doula care under one roof.',
  },
  {
    icon: Users,
    title: 'Family-Centered',
    description: 'Caregiver coaching and collaboration ensure the whole family is supported — not just the child.',
  },
  {
    icon: Brain,
    title: 'Evidence-Based',
    description: 'Individualized, research-informed approaches including trauma-informed care and sensory integration.',
  },
  {
    icon: Sparkles,
    title: 'Culturally Relevant',
    description: 'Services that honor each family\'s culture, values, and lived experiences.',
  },
  {
    icon: BookOpen,
    title: 'Ages 0–21',
    description: 'Comprehensive support from early childhood through young adulthood across all life settings.',
  },
];

const specializedApproaches = [
  'Infant Massage',
  'Primitive Reflex Integration',
  'Rhythmic Movement Therapy',
  'Trauma-Informed Care',
  'Zones of Regulation',
  'Handwriting Without Tears',
];

const testimonials = [
  {
    quote:
      'Ms Dom! One of the best OT therapists I know! Very attentive, caring, and patient—with my son and myself. She is very knowledgeable in her field and tackles every concern and question with so much grace and confidence.',
    name: 'Josselyn Casaleno',
    role: 'Verified Google Review',
  },
  {
    quote:
      'Our son worked with Dominique for over two years, and we can\'t say enough good things. From the first session, she found a way to connect with him, met him where he was, kept things playful, and he actually looked forward to going.',
    name: 'Nethania Milhomme',
    role: 'Verified Google Review',
  },
  {
    quote:
      'I have known Dom for many years and have the pleasure to work with her. I am a speech therapist and we have shared many clients together over the years. She is an incredible OT who truly puts her clients first.',
    name: 'Julie Sarfati',
    role: 'Verified Google Review',
  },
];

export default function HomePage() {
  const scrollRef = useScrollAnimation();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Dom the OT LLC',
    'alternateName': 'Dom the OT',
    'image': 'https://domtheot.com/images/dominique-portrait.png',
    'logo': 'https://domtheot.com/images/logo.png',
    'url': 'https://domtheot.com',
    'telephone': '(786) 390-6614',
    'email': 'DOMTHEOT@GMAIL.COM',
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': 'FL',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '27.1975',
      'longitude': '-80.2528'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      'opens': '08:00',
      'closes': '17:00'
    },
    'sameAs': [
      'https://instagram.com',
      'https://facebook.com'
    ],
    'priceRange': '$$',
    'medicalSpecialty': [
      'OccupationalTherapy',
      'Pediatrics'
    ]
  };

  return (
    <div ref={scrollRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* ==============================
          HERO SECTION
          ============================== */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <div className="hero__label">
                <Baby size={16} />
                Pediatric OT · Doula · Family Support
              </div>
              <h1 className="hero__title">
                Helping Children <br className="hero__mobile-br" /> &amp; Families <span className="hero__title-accent">Thrive</span>
              </h1>
              <p className="hero__subtitle">
                Dominique Alexis is a board-certified occupational therapist and
                certified birth &amp; postpartum doula providing evidence-based,
                culturally relevant care for children and families in Florida.
              </p>
              <div className="hero__actions">
                <Link href="/occupational-therapy" className="btn btn--primary btn--lg">
                  Explore Services
                </Link>
                <Link href="/contact" className="btn btn--outline btn--lg">
                  Request a Consultation
                </Link>
              </div>
              <div className="hero__stats">
                <div className="hero__stat">
                  <div className="hero__stat-value">10+</div>
                  <div className="hero__stat-label">Years Experience</div>
                </div>
                <div className="hero__stat">
                  <div className="hero__stat-value">0–21</div>
                  <div className="hero__stat-label">Ages Served</div>
                </div>
                <div className="hero__stat">
                  <div className="hero__stat-value">7+</div>
                  <div className="hero__stat-label">Specializations</div>
                </div>
              </div>
            </div>

            {/* Visual composition: shapes + image + floating cards */}
            <div className="hero__visual">
              {/* Bold geometric shapes BEHIND the image */}
              <div className="hero__geo hero__geo--green" />
              <div className="hero__geo hero__geo--sage" />
              <div className="hero__geo hero__geo--amber" />
              <div className="hero__geo hero__geo--purple" />
              <div className="hero__geo hero__geo--magenta" />
              <div className="hero__geo hero__geo--pink" />

              {/* Main therapy image */}
              <div className="hero__img-frame">
                <Image
                  src="/images/dom-in-action.jpg"
                  alt="Dominique working one-on-one with a young child on colorful developmental puzzle activities in her therapy clinic"
                  width={560}
                  height={374}
                  className="hero__img"
                  priority
                />
              </div>

              {/* Floating credential cards — Clickable Links */}
              <Link
                href="/occupational-therapy"
                className="hero__card hero__card--ot"
                title="Explore Pediatric Occupational Therapy Services"
              >
                <div className="hero__card-dot hero__card-dot--green" />
                <div>
                  <div className="hero__card-label">Certified OT</div>
                  <div className="hero__card-value">10+ Years</div>
                </div>
                <ChevronRight size={13} className="hero__card-chevron" />
              </Link>

              <Link
                href="/doula-services"
                className="hero__card hero__card--doula"
                title="Explore Certified Birth & Postpartum Doula Services"
              >
                <div className="hero__card-dot hero__card-dot--sage" />
                <div>
                  <div className="hero__card-label">Birth Doula</div>
                  <div className="hero__card-value">Certified</div>
                </div>
                <ChevronRight size={13} className="hero__card-chevron" />
              </Link>

              <Link
                href="/occupational-therapy#early-steps"
                className="hero__card hero__card--steps"
                title="Learn about Early Steps Florida Early Intervention"
              >
                <div className="hero__card-dot hero__card-dot--purple" />
                <div>
                  <div className="hero__card-label">Early Steps</div>
                  <div className="hero__card-value">FL Provider</div>
                </div>
                <ChevronRight size={13} className="hero__card-chevron" />
              </Link>

              <Link
                href="/about"
                className="hero__card hero__card--families"
                title="Learn more About Dominique and our 500+ Families Impacted"
              >
                <div className="hero__card-dot hero__card-dot--amber" />
                <div>
                  <div className="hero__card-label">Families Helped</div>
                  <div className="hero__card-value">500+</div>
                </div>
                <ChevronRight size={13} className="hero__card-chevron" />
              </Link>

              {/* Star rating badge — Clickable Link to Client Stories */}
              <Link
                href="/stories"
                className="hero__rating"
                title="Read 5.0 Star Reviews & Client Stories"
              >
                <Star size={13} className="hero__rating-star" />
                <Star size={13} className="hero__rating-star" />
                <Star size={13} className="hero__rating-star" />
                <Star size={13} className="hero__rating-star" />
                <Star size={13} className="hero__rating-star" />
                <span className="hero__rating-num">5.0</span>
                <ChevronRight size={12} className="hero__card-chevron" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          SERVICES OVERVIEW
          ============================== */}
      <section className="section section--white" id="services">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label">Our Services</p>
            <h2>Comprehensive Support <br className="hero__mobile-br" /> for Your Family</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              From pediatric occupational therapy to doula care, Dom the OT provides
              personalized, whole-family support at every stage.
            </p>
          </div>

          <div
            className="services-grid"
            style={{
              marginTop: 'var(--space-12)',
            }}
          >
            {services.map((service, i) => (
              <Link
                href={service.href}
                key={service.title}
                className={`service-card service-card--${service.color} animate-on-scroll animate-on-scroll--delay-${i + 1}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="service-card__header">
                  <div className={`service-card__icon service-card__icon--${service.color}`}>
                    {service.logoIcon ? (
                      <Image
                        src={service.logoIcon}
                        alt=""
                        width={48}
                        height={48}
                        className="service-card__logo-icon"
                      />
                    ) : (
                      <service.icon size={24} />
                    )}
                  </div>
                  <span className={`service-card__tag service-card__tag--${service.color}`}>
                    {service.tag}
                  </span>
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <span className={`service-card__link service-card__link--${service.color}`}>
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          MEET DOMINIQUE
          ============================== */}
      <section className="section section--cream" id="meet-dominique">
        <div className="container">
          <div className="meet animate-on-scroll">
            <Image
              src="/images/dominique-portrait.png"
              alt="Dominique Alexis — Board-Certified Occupational Therapist and Certified Doula"
              width={400}
              height={500}
              className="meet__image"
            />
            <div className="meet__content">
              <p className="section-label section-label--sage">Meet Dominique</p>
              <h2>A Therapist, Doula & Advocate for Your Family</h2>
              <p style={{ marginTop: 'var(--space-4)' }}>
                Dominique &quot;Dom&quot; Alexis is a board-certified occupational therapist
                based in Florida with over 10 years of experience in pediatric care.
                She has worked across hospitals, schools, preschools, and private practices.
              </p>
              <p>
                As a certified birth & postpartum doula and aroma therapist,
                Dominique offers a uniquely holistic approach — combining clinical
                expertise with compassionate, personalized support for families
                navigating every stage of parenthood.
              </p>
              <p>
                She is a provider with <strong>Early Steps Treasure Coast</strong>,
                specializing in early intervention services designed to help
                children thrive from infancy.
              </p>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <Link href="/about" className="btn btn--sage">
                  Meet Dominique <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          WHY DOM THE OT
          ============================== */}
      <section className="section section--linen" id="why-us">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label">Why Dom the OT</p>
            <h2>What Makes Us Different</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              A unique combination of clinical expertise, cultural responsiveness,
              and genuine compassion for every family we serve.
            </p>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-12)' }}>
            {differentiators.map((item, i) => (
              <div
                key={item.title}
                className={`card animate-on-scroll animate-on-scroll--delay-${(i % 3) + 1}`}
              >
                <div className="card__icon card__icon--sage">
                  <item.icon size={24} />
                </div>
                <h4 className="card__title">{item.title}</h4>
                <p className="card__description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          SPECIALIZED APPROACHES
          ============================== */}
      <section className="section section--white" id="approaches">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--purple">Specialized Approaches</p>
            <h2>Evidence-Based Therapy Methods</h2>
          </div>
          <div
            className="animate-on-scroll"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              marginTop: 'var(--space-10)',
              maxWidth: '700px',
              margin: 'var(--space-10) auto 0',
            }}
          >
            {specializedApproaches.map((approach) => (
              <span key={approach} className="badge badge--purple">
                <CheckCircle size={12} />
                {approach}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          HOW IT WORKS
          ============================== */}
      <section className="section section--sage-soft" id="how-it-works">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--sage">How It Works</p>
            <h2>Getting Started Is Simple</h2>
          </div>

          <div className="steps animate-on-scroll">
            <div className="step">
              <div className="step__number">1</div>
              <h4 className="step__title">Tell Us What You Need</h4>
              <p className="step__description">
                Share your concerns and goals through our simple inquiry form.
                Whether it&apos;s OT, doula support, or both — we want to hear from you.
              </p>
            </div>
            <div className="step">
              <div className="step__number">2</div>
              <h4 className="step__title">Meet Dominique</h4>
              <p className="step__description">
                Schedule a consultation to discuss your family&apos;s unique needs
                and create a personalized plan together.
              </p>
            </div>
            <div className="step">
              <div className="step__number">3</div>
              <h4 className="step__title">Receive Personalized Support</h4>
              <p className="step__description">
                Begin your journey with evidence-based therapy and compassionate
                care tailored to your child and family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          MISSION STATEMENT
          ============================== */}
      <section className="section section--charcoal" id="mission">
        <div className="container container--narrow text-center animate-on-scroll">
          <p className="section-label" style={{ color: 'var(--color-sage)' }}>
            Our Mission
          </p>
          <h2 style={{ fontSize: 'clamp(var(--text-xl), 3vw, var(--text-3xl))' }}>
            We deliver timely, culturally relevant services that empower children
            and families to live authentically while combating structural ableism
            and inequitable systems.
          </h2>
          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Through caregiver coaching, interdisciplinary collaboration, and
            family-centered care, our goal is to help children aged 0 to 21
            thrive in home, school, and community settings.
          </p>
        </div>
      </section>

      {/* ==============================
          TESTIMONIALS
          ============================== */}
      <section className="section section--cream" id="testimonials">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label">Verified Google Reviews</p>
            <h2>What Families and Colleagues Say</h2>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-12)' }}>
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`card card--testimonial animate-on-scroll animate-on-scroll--delay-${i + 1}`}
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
                <p className="card__quote">{testimonial.quote}</p>
                <div className="card__author">
                  <div>
                    <div className="card__author-name">{testimonial.name}</div>
                    <div className="card__author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link href="/stories" className="btn btn--secondary">
              Read Google Reviews <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          FINAL CTA
          ============================== */}
      <section className="section" id="final-cta">
        <div className="cta-section animate-on-scroll">
          <div className="container">
            <h2 className="cta-section__title">Ready to Support <br className="hero__mobile-br" /> Your Child&apos;s Growth?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)', maxWidth: '600px' }}>
              Every child deserves the opportunity to thrive. Let&apos;s talk about
              how Dominique can support your family with personalized, evidence-based care.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Request a Consultation
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
