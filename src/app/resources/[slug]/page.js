'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';

export default function ResourceArticlePage({ params }) {
  const { slug } = use(params);
  const [resource, setResource] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      let items = [];
      try {
        const response = await fetch('/api/resources?published=true');
        const result = await response.json();
        if (response.ok) items = result.data || [];
      } catch {}
      if (!items.length) {
        try { items = JSON.parse(localStorage.getItem('dom_resources') || '[]').filter((item) => item.published); } catch {}
      }
      setResource(items.find((item) => item.slug === slug || String(item.id) === slug) || null);
      setLoaded(true);
    }
    load();
  }, [slug]);

  if (!loaded) return <main className="resource-article"><div className="container container--narrow">Loading resource…</div></main>;
  if (!resource) return (
    <main className="resource-article"><div className="container container--narrow resource-empty"><BookOpen size={42} /><h1>Resource not found</h1><Link href="/resources" className="btn btn--secondary"><ArrowLeft size={16} /> Back to resources</Link></div></main>
  );

  const referenceLinks = (resource.reference_links || []).map((link, index) =>
    typeof link === 'string' ? { title: `Helpful Link ${index + 1}`, url: link } : link
  ).filter((link) => link?.url).slice(0, 5);

  return (
    <main className="resource-article">
      <article className="container container--narrow">
        <Link href="/resources" className="resource-back"><ArrowLeft size={16} /> All resources</Link>
        <span className="badge badge--sage">{resource.category}</span>
        <h1>{resource.title}</h1>
        {resource.description && <p className="resource-article__intro">{resource.description}</p>}
        <div className="resource-article__body">{resource.content || resource.description}</div>
        {referenceLinks.length > 0 && (
          <section className="resource-article__links" aria-labelledby="article-links-heading">
            <h2 id="article-links-heading">LINKS</h2>
            <div className="resource-article__link-grid">
              {referenceLinks.map((link, index) => (
                <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-article__link-button">
                  <span>{link.title || `Helpful Link ${index + 1}`}</span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
