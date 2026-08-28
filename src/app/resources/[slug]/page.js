'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

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

  return (
    <main className="resource-article">
      <article className="container container--narrow">
        <Link href="/resources" className="resource-back"><ArrowLeft size={16} /> All resources</Link>
        <span className="badge badge--sage">{resource.category}</span>
        <h1>{resource.title}</h1>
        {resource.description && <p className="resource-article__intro">{resource.description}</p>}
        <div className="resource-article__body">{resource.content || resource.description}</div>
      </article>
    </main>
  );
}
