'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll--visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observeAnimations = (root) => {
      if (!root) return;
      if (root.matches?.('.animate-on-scroll')) observer.observe(root);
      root.querySelectorAll?.('.animate-on-scroll').forEach((el) => observer.observe(el));
    };

    observeAnimations(ref.current);

    // Resource and CMS content arrives after the initial render. Observe newly
    // inserted animated elements so they do not remain permanently transparent.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeAnimations(node);
        });
      });
    });

    if (ref.current) {
      mutationObserver.observe(ref.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return ref;
}
