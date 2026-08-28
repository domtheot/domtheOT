'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = [
  'All',
  'Pregnancy',
  'Birth',
  'Postpartum',
  'Occupational Therapy',
  'Parenting',
  'Infant Development',
  'Maternal Wellness',
];

// Placeholder resources (will be fetched from Supabase in production)
const fallbackResources = [
  {
    id: 1,
    title: 'Understanding Sensory Processing in Children',
    category: 'Occupational Therapy',
    description:
      'Learn how sensory processing affects your child\'s behavior, attention, and daily activities — and what you can do to help.',
    color: 'green', published: true, featured_link: true,
  },
  {
    id: 2,
    title: 'Preparing for Your Birth Experience',
    category: 'Birth',
    description:
      'A comprehensive guide to creating birth preferences, understanding your options, and feeling confident heading into labor.',
    color: 'amber', published: true, featured_link: true,
  },
  {
    id: 3,
    title: 'Building Postpartum Routines That Work',
    category: 'Postpartum',
    description:
      'Practical strategies for establishing sustainable daily routines during the early postpartum period.',
    color: 'purple', published: true, featured_link: true,
  },
  {
    id: 4,
    title: 'Fine Motor Development Milestones',
    category: 'Infant Development',
    description:
      'What to expect at each stage of fine motor development and activities you can do at home to support growth.',
    color: 'magenta', published: true, featured_link: false,
  },
  {
    id: 5,
    title: 'What Does a Doula Actually Do?',
    category: 'Pregnancy',
    description:
      'Everything you need to know about doula support — what to expect, how it helps, and who it\'s for.',
    color: 'sage', published: true, featured_link: true,
  },
  {
    id: 6,
    title: 'Gross Motor Skills: A Parent\'s Guide',
    category: 'Occupational Therapy',
    description:
      'Understanding how gross motor skills develop and how occupational therapy can support children who need extra help.',
    color: 'green', published: true, featured_link: false,
  },
  {
    id: 7,
    title: 'Self-Care for New Parents',
    category: 'Maternal Wellness',
    description:
      'Why prioritizing your own well-being isn\'t selfish — it\'s essential. Practical self-care strategies for exhausted parents.',
    color: 'sage', published: true, featured_link: false,
  },
  {
    id: 8,
    title: 'When to Seek Early Intervention',
    category: 'Parenting',
    description:
      'Signs that your child may benefit from early intervention services, and how to get started in Florida.',
    color: 'purple', published: true, featured_link: false,
  },
];

export default function ResourcesPage() {
  const scrollRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await fetch('/api/resources?published=true');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setResources(result.data || []);
        return;
      } catch (error) {
        console.warn('Using locally available resources:', error);
      }
      try {
        const saved = JSON.parse(localStorage.getItem('dom_resources') || '[]');
        const published = saved.filter((resource) => resource.published);
        setResources(published.length ? published : fallbackResources);
      } catch {
        setResources(fallbackResources);
      }
    }
    loadResources();
  }, []);

  const colorFor = (resource) => resource.color || ({
    'Occupational Therapy': 'green', Birth: 'amber', Postpartum: 'purple',
    'Infant Development': 'magenta', Pregnancy: 'sage', Parenting: 'purple',
    'Maternal Wellness': 'sage',
  }[resource.category] || 'sage');

  const filtered = resources.filter((r) => {
    const matchesCategory =
      activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const designatedLinks = resources
    .filter((resource) => resource.featured_link)
    .flatMap((resource) => {
      const links = resource.reference_links?.map((link, index) => typeof link === 'string' ? { title: `Helpful Link ${index + 1}`, url: link } : link).filter((link) => link?.url) || [];
      if (!links.length) {
        return [{ resource, href: resource.link_url || `/resources/${resource.slug || resource.id}`, external: !!resource.link_url }];
      }
      return links.map((link, index) => ({ resource, href: link.url, linkTitle: link.title, external: true, index }));
    })
    .slice(0, 5);

  return (
    <div ref={scrollRef}>
      {/* Page Header */}
      <section className="page-header section--linen">
        <div className="container">
          <p className="section-label animate-on-scroll">Resources</p>
          <h1 className="page-header__title animate-on-scroll">
            Education & Guidance
          </h1>
          <p className="page-header__subtitle animate-on-scroll">
            Articles, guides, and resources to support your family&apos;s journey —
            from pregnancy through childhood development.
          </p>
        </div>
      </section>

      {designatedLinks.length > 0 && (
        <section className="section section--cream" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="reference-heading animate-on-scroll">
              <p className="section-label">Your Quick References</p>
              <h2>Helpful links, all in one place</h2>
              <p>Keep these designated resources handy whenever you need to come back to them.</p>
            </div>
            <div className="reference-grid">
              {designatedLinks.map(({ resource, href, linkTitle, external, index }) => {
                return (
                  <Link key={`${resource.id}-${href}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="reference-card animate-on-scroll">
                    <span className={`badge badge--${colorFor(resource)}`}>{resource.category}</span>
                    <strong>{linkTitle || resource.title}{!linkTitle && index > 0 ? ` — Link ${index + 1}` : ''}</strong>
                    {external ? <ExternalLink size={18} /> : <ArrowRight size={18} />}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="section section--cream" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div
            className="animate-on-scroll"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              alignItems: 'center',
            }}
          >
            {/* Search */}
            <div className="search-bar" style={{ maxWidth: '500px', width: '100%' }}>
              <Search size={20} className="search-bar__icon" />
              <input
                type="text"
                className="search-bar__input"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
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

            {/* Category Filters */}
            <div className="filter-pills">
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
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section section--cream">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center" style={{ padding: 'var(--space-16) 0' }}>
              <BookOpen size={48} color="var(--color-warm-gray-light)" style={{ margin: '0 auto var(--space-4)' }} />
              <h3 style={{ color: 'var(--color-warm-gray)' }}>No resources found</h3>
              <p style={{ color: 'var(--color-warm-gray-light)', marginTop: 'var(--space-2)' }}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid--3">
              {filtered.map((resource, i) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.slug || resource.id}`}
                  className={`card card--service card--${colorFor(resource)} animate-on-scroll animate-on-scroll--delay-${(i % 3) + 1}`}
                >
                  <span className={`badge badge--${colorFor(resource)}`} style={{ marginBottom: 'var(--space-3)' }}>
                    {resource.category}
                  </span>
                  <h3 className="card__title">{resource.title}</h3>
                  <p className="card__description">{resource.description}</p>
                  <span className="card__link">
                    Read more <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-section animate-on-scroll">
          <div className="container container--narrow">
            <h2>Looking for Personalized Guidance?</h2>
            <p className="subtitle" style={{ margin: '0 auto', marginTop: 'var(--space-4)' }}>
              Resources are a great start — but nothing replaces personalized
              support tailored to your family&apos;s unique needs.
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
