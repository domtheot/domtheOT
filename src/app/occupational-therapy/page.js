'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  Bath,
  Puzzle,
  Wind,
  ArrowRight,
  CheckCircle,
  Plus,
  Brain,
  HandHeart,
  Baby,
  Users,
  BookOpen,
  Shield,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const areasOfGrowth = [
  {
    logoIcon: '/images/icon-logo-child.png',
    title: 'Gross Motor Skills',
    color: 'green',
    description:
      'Developing strength, coordination, and movement skills needed for crawling, walking, jumping, and active play.',
    examples: ['Balance & coordination', 'Strength building', 'Body awareness', 'Motor planning'],
  },
  {
    logoIcon: '/images/icon-logo-hand.png',
    title: 'Hygiene & Daily Life Skills',
    color: 'amber',
    description:
      'Building independence in self-care routines like dressing, grooming, feeding, and personal hygiene.',
    examples: ['Self-feeding skills', 'Dressing & grooming', 'Toileting routines', 'Personal hygiene'],
  },
  {
    logoIcon: '/images/icon-logo-cube.png',
    title: 'Fine Motor Skills',
    color: 'purple',
    description:
      'Strengthening the small muscles needed for writing, cutting, buttoning, manipulating objects, and classroom tasks.',
    examples: ['Handwriting', 'Scissor skills', 'Hand strength', 'Visual-motor integration'],
  },
  {
    logoIcon: '/images/icon-logo-swing.png',
    title: 'Sensory Processing',
    color: 'magenta',
    description:
      'Helping children regulate sensory input to improve attention, behavior, emotional regulation, and participation.',
    examples: ['Sensory modulation', 'Self-regulation', 'Sensory diets', 'Environmental adaptations'],
  },
];

const approaches = [
  { name: 'Infant Massage', icon: Baby },
  { name: 'Primitive Reflex Integration', icon: Activity },
  { name: 'Rhythmic Movement Therapy', icon: Wind },
  { name: 'Trauma-Informed Care', icon: Shield },
  { name: 'Zones of Regulation', icon: Brain },
  { name: 'Handwriting Without Tears', icon: BookOpen },
  { name: 'ASD Clinical Specialist', icon: Puzzle },
];

const servicePillars = [
  {
    icon: Users,
    title: 'Family Centered Support',
    description:
      'We work with the whole family — not just the child. Caregiver coaching empowers parents to carry progress forward in everyday life.',
  },
  {
    icon: Baby,
    title: 'Early Intervention',
    description:
      'Early services can make all the difference. We provide timely support for infants and toddlers with developmental delays and special needs.',
  },
  {
    icon: HandHeart,
    title: 'Caregiver Coaching',
    description:
      'Teaching caregivers strategies and techniques they can use at home, at school, and in the community to support their child\'s growth.',
  },
];

const faqs = [
  {
    question: 'What is occupational therapy for children?',
    answer:
      'Pediatric occupational therapy helps children develop the skills they need to participate in daily activities — from playing and learning to self-care and social interaction. OTs address motor, sensory, cognitive, and emotional development.',
  },
  {
    question: 'How do I know if my child needs OT?',
    answer:
      'Signs that your child might benefit from OT include difficulty with fine or gross motor skills, challenges with self-care tasks, sensory sensitivities or seeking behaviors, trouble with handwriting, difficulty with attention or regulation, and delays in reaching developmental milestones.',
  },
  {
    question: 'What ages do you serve?',
    answer:
      'Dom the OT provides services for children and young adults from birth through age 21. We specialize in early intervention (0–3) and also support school-age children and adolescents.',
  },
  {
    question: 'Where do sessions take place?',
    answer:
      'Sessions can take place in various settings depending on your family\'s needs, including your home, school, community settings, or a clinical environment.',
  },
  {
    question: 'What is early intervention?',
    answer:
      'Early intervention is a system of services for infants and toddlers (birth to age 3) who have developmental delays or are at risk for delays. Research shows that early intervention can significantly improve outcomes. Dominique is a provider with Early Steps Treasure Coast.',
  },
  {
    question: 'Do you accept insurance?',
    answer:
      'Please contact us to discuss payment options and insurance coverage. We can help you understand your benefits and navigate the process.',
  },
];

export default function OccupationalTherapyPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--green-soft">
        <div className="container">
          <p className="section-label section-label--green animate-on-scroll">
            Occupational Therapy
          </p>
          <h1 className="page-header__title animate-on-scroll">
            Pediatric Occupational Therapy
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Evidence-based, individualized therapy helping children ages 0–21
            develop the skills they need to thrive in every area of life.
          </p>
          <div style={{ marginTop: 'var(--space-8)' }} className="animate-on-scroll">
            <Link href="/contact" className="btn btn--primary btn--lg">
              Ask About OT Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* What is OT */}
      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="animate-on-scroll">
            <p className="section-label section-label--green section-label--centered">Understanding OT</p>
            <h2>What Is Occupational Therapy?</h2>
            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              For children, &quot;occupation&quot; means everything they need to do in
              daily life — playing, learning, eating, dressing, socializing, and
              exploring their world. Occupational therapy helps children build the
              motor, sensory, cognitive, and emotional skills needed to participate
              fully and confidently.
            </p>
            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              At Dom the OT, we believe every child deserves the opportunity to
              thrive. Our individualized, evidence-based approach meets each child
              exactly where they are — and helps them grow at their own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Growth */}
      <section className="section section--white">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--green">Areas of Growth</p>
            <h2>How OT Can Help Your Child</h2>
            <p className="subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
              We address the foundational skills children need to participate in
              everyday activities with confidence and independence.
            </p>
          </div>

          <div className="grid grid--2" style={{ marginTop: 'var(--space-12)' }}>
            {areasOfGrowth.map((area, i) => (
              <div
                key={area.title}
                className={`card card--service card--${area.color} animate-on-scroll animate-on-scroll--delay-${(i % 2) + 1}`}
              >
                <div className={`card__logo-icon-wrap card__logo-icon-wrap--${area.color}`}>
                  <Image
                    src={area.logoIcon}
                    alt=""
                    width={52}
                    height={52}
                    className="card__logo-icon"
                  />
                </div>
                <h3 className="card__title">{area.title}</h3>
                <p className="card__description">{area.description}</p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    marginTop: 'var(--space-4)',
                  }}
                >
                  {area.examples.map((ex) => (
                    <span key={ex} className={`badge badge--${area.color}`}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="section section--linen">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--purple">Our Approach</p>
            <h2>How We Work With Families</h2>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-12)' }}>
            {servicePillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`card animate-on-scroll animate-on-scroll--delay-${i + 1}`}
                style={{ textAlign: 'center' }}
              >
                <div
                  className="card__icon card__icon--purple"
                  style={{ margin: '0 auto var(--space-4)' }}
                >
                  <pillar.icon size={24} />
                </div>
                <h4 className="card__title">{pillar.title}</h4>
                <p className="card__description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Approaches */}
      <section className="section section--white">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--amber">Specialized Approaches</p>
            <h2>Evidence-Based Methods</h2>
            <p className="subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
              Dominique draws from a range of specialized, evidence-based therapy
              approaches tailored to each child&apos;s unique needs.
            </p>
          </div>

          <div className="grid grid--4" style={{ marginTop: 'var(--space-12)' }}>
            {approaches.map((approach, i) => (
              <div
                key={approach.name}
                className={`card card--flat animate-on-scroll animate-on-scroll--delay-${(i % 4) + 1}`}
                style={{ textAlign: 'center', padding: 'var(--space-6)' }}
              >
                <div
                  className="card__icon card__icon--amber"
                  style={{ margin: '0 auto var(--space-3)' }}
                >
                  <approach.icon size={20} />
                </div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  {approach.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Steps Provider */}
      <section className="section section--charcoal" id="early-steps">
        <div className="container container--narrow text-center animate-on-scroll">
          <div
            className="badge badge--green"
            style={{ margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)', padding: '8px 20px' }}
          >
            <Shield size={14} /> Affiliated Provider
          </div>
          <h2>Provider with Early Steps Treasure Coast</h2>
          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Dominique is a proud provider with Early Steps Treasure Coast —
            Florida&apos;s early intervention program serving infants and toddlers
            from birth through age 3 with developmental delays or at-risk conditions.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="text-center animate-on-scroll">
            <p className="section-label">Common Questions</p>
            <h2>OT FAQ</h2>
          </div>

          <div className="accordion animate-on-scroll" style={{ marginTop: 'var(--space-10)' }}>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Concerned About Your Child&apos;s Development?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Early intervention can make all the difference. Let&apos;s talk about
              how occupational therapy can support your child and family.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Ask About OT Services <ArrowRight size={16} />
              </Link>
              <a href="tel:+17863906614" className="btn btn--secondary btn--lg">
                Call (786) 390-6614
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AccordionItem({ question, answer }) {
  const handleToggle = (e) => {
    const item = e.currentTarget.parentElement;
    item.classList.toggle('accordion__item--open');
  };

  return (
    <div className="accordion__item">
      <button className="accordion__trigger" onClick={handleToggle}>
        <span>{question}</span>
        <Plus size={20} className="accordion__icon" />
      </button>
      <div className="accordion__content">
        <div className="accordion__body">{answer}</div>
      </div>
    </div>
  );
}
