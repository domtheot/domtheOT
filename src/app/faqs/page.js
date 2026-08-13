'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X, Plus, ArrowRight, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqCategories = [
  'All',
  'Doula Services',
  'Occupational Therapy',
  'Pregnancy',
  'Birth',
  'Postpartum',
  'Scheduling',
  'Payments',
  'Service Area',
];

const faqData = [
  {
    category: 'Doula Services',
    question: 'What exactly does a doula do?',
    answer:
      'A doula is a trained professional who provides continuous physical, emotional, and informational support during pregnancy, birth, and postpartum. Unlike a midwife or doctor, a doula does not perform medical procedures — she focuses on your comfort, education, and advocacy.',
  },
  {
    category: 'Doula Services',
    question: 'When should I hire a doula?',
    answer:
      'Ideally, reach out during your second trimester so there\'s plenty of time to build a relationship and prepare. However, it\'s never too early or too late to seek support.',
  },
  {
    category: 'Doula Services',
    question: 'Can a doula support me during a C-section?',
    answer:
      'Absolutely. A doula can provide emotional support before, during, and after a cesarean birth. Many families find doula support especially valuable during C-sections.',
  },
  {
    category: 'Occupational Therapy',
    question: 'What is pediatric occupational therapy?',
    answer:
      'Pediatric OT helps children develop the skills they need to participate in daily activities — playing, learning, eating, dressing, socializing. It addresses motor, sensory, cognitive, and emotional development.',
  },
  {
    category: 'Occupational Therapy',
    question: 'How do I know if my child needs OT?',
    answer:
      'Signs include difficulty with fine or gross motor skills, challenges with self-care tasks, sensory sensitivities, trouble with handwriting, difficulty with attention or regulation, and delays in developmental milestones.',
  },
  {
    category: 'Occupational Therapy',
    question: 'What ages do you serve?',
    answer:
      'We provide services for children and young adults from birth through age 21, with a specialization in early intervention (0–3).',
  },
  {
    category: 'Pregnancy',
    question: 'What is the difference between a doula and a midwife?',
    answer:
      'A midwife is a medical professional who provides clinical care and can deliver babies. A doula provides non-medical support — emotional, physical, and informational — throughout pregnancy, birth, and postpartum.',
  },
  {
    category: 'Birth',
    question: 'Do you work with my partner or support person?',
    answer:
      'Yes! Supporting your partner is a core part of doula care. Dominique helps partners feel confident, included, and equipped with tools to actively participate.',
  },
  {
    category: 'Postpartum',
    question: 'What does postpartum doula support include?',
    answer:
      'Postpartum support includes recovery guidance, newborn care education, feeding support, sleep strategies, emotional check-ins, routine building, and connecting you with additional resources as needed.',
  },
  {
    category: 'Scheduling',
    question: 'How do I schedule a consultation?',
    answer:
      'You can submit an inquiry through our contact form, call us at (786) 390-6614, or email DOMTHEOT@GMAIL.COM. Dominique will respond within 24–48 hours to schedule a consultation.',
  },
  {
    category: 'Payments',
    question: 'Do you accept insurance?',
    answer:
      'Please contact us to discuss payment options and insurance coverage. We can help you understand your benefits and navigate the process.',
  },
  {
    category: 'Service Area',
    question: 'What area do you serve?',
    answer:
      'Dominique provides services in the Treasure Coast area of Florida. She is also a provider with Early Steps Treasure Coast. Contact us to discuss availability in your location.',
  },
  {
    category: 'Service Area',
    question: 'Do you offer virtual services?',
    answer:
      'Some services and consultations may be available virtually. Please contact us to discuss your specific needs and whether virtual support would be a good fit.',
  },
];

export default function FAQsPage() {
  const scrollRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--purple-soft">
        <div className="container">
          <p className="section-label section-label--purple animate-on-scroll">FAQs</p>
          <h1 className="page-header__title animate-on-scroll">
            Frequently Asked Questions
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Find answers to common questions about our services, scheduling,
            and what to expect.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section section--cream" style={{ paddingBottom: 0 }}>
        <div className="container container--narrow">
          <div
            className="animate-on-scroll"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              alignItems: 'center',
            }}
          >
            <div className="search-bar" style={{ maxWidth: '500px', width: '100%' }}>
              <Search size={20} className="search-bar__icon" />
              <input
                type="text"
                className="search-bar__input"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search frequently asked questions"
              />
              {searchQuery && (
                <button
                  className="search-bar__clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-pills" style={{ justifyContent: 'center' }}>
              {faqCategories.map((cat) => (
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
        </div>
      </section>

      {/* FAQ List */}
      <section className="section section--cream">
        <div className="container container--narrow">
          {filtered.length === 0 ? (
            <div className="text-center" style={{ padding: 'var(--space-16) 0' }}>
              <HelpCircle size={48} color="var(--color-warm-gray-light)" style={{ margin: '0 auto var(--space-4)' }} />
              <h3 style={{ color: 'var(--color-warm-gray)' }}>No questions found</h3>
              <p style={{ color: 'var(--color-warm-gray-light)', marginTop: 'var(--space-2)' }}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="accordion animate-on-scroll">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Still Have Questions?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              We&apos;re happy to answer any additional questions you may have.
              Don&apos;t hesitate to reach out.
            </p>
            <div className="cta-section__actions" style={{ marginTop: 'var(--space-8)' }}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Contact Dominique <ArrowRight size={16} />
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

function AccordionItem({ question, answer, category }) {
  const handleToggle = (e) => {
    const item = e.currentTarget.parentElement;
    item.classList.toggle('accordion__item--open');
  };

  const colorMap = {
    'Doula Services': 'sage',
    'Occupational Therapy': 'green',
    'Pregnancy': 'amber',
    'Birth': 'amber',
    'Postpartum': 'purple',
    'Scheduling': 'magenta',
    'Payments': 'charcoal',
    'Service Area': 'charcoal',
  };

  return (
    <div className="accordion__item">
      <button className="accordion__trigger" onClick={handleToggle}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className={`badge badge--${colorMap[category] || 'charcoal'}`} style={{ fontSize: '10px' }}>
            {category}
          </span>
          {question}
        </span>
        <Plus size={20} className="accordion__icon" />
      </button>
      <div className="accordion__content">
        <div className="accordion__body">{answer}</div>
      </div>
    </div>
  );
}
