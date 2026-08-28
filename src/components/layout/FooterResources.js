'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function FooterResources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function loadDesignatedResources() {
      try {
        const response = await fetch('/api/resources?published=true&featured=true&limit=5');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setResources((result.data || []).slice(0, 5));
      } catch {
        try {
          const localResources = JSON.parse(localStorage.getItem('dom_resources') || '[]');
          setResources(localResources.filter((item) => item.published && item.featured_link).slice(0, 5));
        } catch {
          setResources([]);
        }
      }
    }

    loadDesignatedResources();
  }, []);

  return (
    <div>
      <h3 className="footer__heading">Quick Resources</h3>
      {resources.length ? resources.map((resource) => {
        const href = `/resources/${resource.slug || resource.id}`;
        return (
          <Link
            key={resource.id}
            href={href}
            className="footer__link footer__resource-link"
          >
            <span>{resource.title}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        );
      }) : (
        <Link href="/resources" className="footer__link footer__resource-link">
          <span>Explore the Resource Hub</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
