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
        const links = (result.data || []).flatMap((resource) => {
          const destinations = resource.reference_links?.map((link, index) => typeof link === 'string' ? { title: `Helpful Link ${index + 1}`, url: link } : link).filter((link) => link?.url) || [];
          if (!destinations.length) return [{ ...resource, destination: resource.link_url || `/resources/${resource.slug || resource.id}` }];
          return destinations.map((destination, index) => ({ ...resource, destination: destination.url, linkTitle: destination.title, linkIndex: index }));
        });
        setResources(links.slice(0, 5));
      } catch {
        try {
          const localResources = JSON.parse(localStorage.getItem('dom_resources') || '[]');
          const links = localResources.filter((item) => item.published && item.featured_link).flatMap((resource) => {
            const destinations = resource.reference_links?.map((link, index) => typeof link === 'string' ? { title: `Helpful Link ${index + 1}`, url: link } : link).filter((link) => link?.url) || [];
            if (!destinations.length) return [{ ...resource, destination: resource.link_url || `/resources/${resource.slug || resource.id}` }];
            return destinations.map((destination, index) => ({ ...resource, destination: destination.url, linkTitle: destination.title, linkIndex: index }));
          });
          setResources(links.slice(0, 5));
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
        const href = resource.destination || resource.link_url || `/resources/${resource.slug || resource.id}`;
        const external = /^https?:\/\//i.test(href);
        return (
          <Link
            key={`${resource.id}-${href}`}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="footer__link footer__resource-link"
          >
            <span>{resource.linkTitle || resource.title}{!resource.linkTitle && resource.linkIndex > 0 ? ` — Link ${resource.linkIndex + 1}` : ''}</span>
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
