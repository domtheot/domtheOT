'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Users,
  Baby,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Plus,
  Flower2,
  HandHeart,
  MessageCircle,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const supportAreas = [
  {
    icon: Baby,
    title: 'Prenatal Support',
    description:
      'Education, birth preparation, emotional support, and guidance through the decisions and changes of pregnancy.',
  },
  {
    icon: HandHeart,
    title: 'Birth Support',
    description:
      'Continuous presence during labor and delivery, comfort measures, breathing techniques, and advocacy for your birth preferences.',
  },
  {
    icon: Users,
    title: 'Partner Support',
    description:
      'Helping partners feel confident and included, with practical tools and emotional coaching for active participation.',
  },
  {
    icon: Heart,
    title: 'Postpartum Transition',
    description:
      'Recovery support, newborn care guidance, establishing routines, and emotional check-ins during those critical early weeks.',
  },
  {
    icon: Flower2,
    title: 'Aroma Therapy',
    description:
      'Evidence-based aromatherapy techniques to support relaxation, comfort, and emotional well-being during pregnancy and birth.',
  },
  {
    icon: MessageCircle,
    title: 'Advocacy & Education',
    description:
      'Helping you understand your options, communicate with your care team, and feel empowered in every decision.',
  },
];

const faqs = [
  {
    question: 'What exactly does a doula do?',
    answer:
      'A doula provides continuous physical, emotional, and informational support during pregnancy, birth, and postpartum. Unlike a midwife or doctor, a doula does not perform medical procedures — instead, she focuses entirely on your comfort, education, and advocacy.',
  },
  {
    question: 'When should I hire a doula?',
    answer:
      'Ideally, reach out during your second trimester so there\'s plenty of time to build a relationship and prepare together. However, it\'s never too early or too late to seek support.',
  },
  {
    question: 'Can a doula support me if I\'m having a C-section?',
    answer:
      'Absolutely. A doula can provide emotional support before, during, and after a cesarean birth. Many families find doula support especially valuable during C-sections for comfort and advocacy.',
  },
  {
    question: 'Do you work with my partner or support person?',
    answer:
      'Yes! Supporting your partner is a core part of doula care. Dominique helps partners feel confident, included, and equipped with tools to actively participate in the birth experience.',
  },
  {
    question: 'What makes Dominique\'s doula services unique?',
    answer:
      'Dominique combines her certified doula training with over 10 years of occupational therapy expertise. This means she can support your family not just through birth, but through the functional transitions of becoming a parent — routines, development, and daily life.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'Dominique provides doula services in the Treasure Coast area of Florida. Contact us to discuss availability in your location.',
  },
];

export default function DoulaServicesPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--sage-soft">
        <div className="container doula-hero__inner">
          <div className="doula-hero__content">
            <p className="section-label section-label--sage animate-on-scroll">Doula Services</p>
            <h1 className="page-header__title animate-on-scroll">
              Compassionate Birth & Postpartum Support
            </h1>
            <p className="page-header__subtitle animate-on-scroll">
              Certified birth and postpartum doula care combined with the clinical
              insight of an experienced occupational therapist.
            </p>
            <div style={{ marginTop: 'var(--space-8)' }} className="animate-on-scroll">
              <Link href="/contact" className="btn btn--sage btn--lg">
                Request Doula Support <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <Image
            src="/images/soul-haven-logo.svg"
            alt="Soul Haven"
            width={220}
            height={275}
            className="doula-hero__logo animate-on-scroll"
            priority
          />
        </div>
      </section>

      {/* What is a Doula */}
      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="animate-on-scroll">
            <p className="section-label section-label--centered">Understanding Doula Support</p>
            <h2 className="text-center">What Is a Doula?</h2>
            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              A doula is a trained professional who provides continuous physical,
              emotional, and informational support to a birthing person before, during,
              and after childbirth. Doulas do not replace medical providers — they
              complement your care team by focusing entirely on your comfort, education,
              and advocacy.
            </p>
            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              Research consistently shows that doula support is associated with shorter
              labors, fewer complications, higher satisfaction with the birth experience,
              and improved postpartum outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Who Is Doula Support For */}
      <section className="section section--white">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--sage">Who It&apos;s For</p>
            <h2>Doula Support Is for Everyone</h2>
            <p className="subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
              Whether this is your first pregnancy or your fourth, doula care provides
              personalized support for your unique journey.
            </p>
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
            {[
              'First-time parents',
              'Experienced parents',
              'Single parents',
              'LGBTQ+ families',
              'Families of all backgrounds',
              'High-risk pregnancies',
              'VBAC births',
              'Cesarean births',
              'Parents needing postpartum support',
            ].map((item) => (
              <span key={item} className="badge badge--sage">
                <CheckCircle size={12} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Support Areas */}
      <section className="section section--linen">
        <div className="container">
          <div className="text-center animate-on-scroll">
            <p className="section-label section-label--sage">How I Support You</p>
            <h2>What Working Together Looks Like</h2>
          </div>

          <div className="grid grid--3" style={{ marginTop: 'var(--space-12)' }}>
            {supportAreas.map((area, i) => (
              <div
                key={area.title}
                className={`card card--service card--sage animate-on-scroll animate-on-scroll--delay-${(i % 3) + 1}`}
              >
                <div className="card__icon card__icon--sage">
                  <area.icon size={24} />
                </div>
                <h4 className="card__title">{area.title}</h4>
                <p className="card__description">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Advantage */}
      <section className="section section--charcoal">
        <div className="container container--narrow text-center animate-on-scroll">
          <p className="section-label" style={{ color: 'var(--color-sage)' }}>
            The Dom the OT Difference
          </p>
          <h2>Doula Care + OT Expertise</h2>
          <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            What sets Dominique apart is her unique combination of certified doula
            training and over a decade of occupational therapy experience. This means
            she doesn&apos;t just support you through birth — she helps your entire
            family transition into daily life with confidence, practical skills, and
            evidence-based guidance.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream">
        <div className="container container--narrow">
          <div className="text-center animate-on-scroll">
            <p className="section-label">Common Questions</p>
            <h2>Doula FAQ</h2>
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
            <h2>Begin Your Birth Support Journey</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Every birth experience is unique. Let Dominique provide the
              compassionate, knowledgeable support you deserve.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Request Doula Support <ArrowRight size={16} />
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
