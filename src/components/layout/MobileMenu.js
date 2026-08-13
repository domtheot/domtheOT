'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, navLinks, services }) {
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  // Focus trap + escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu__header">
        <Image
          src="/images/logo.png"
          alt="Dom the OT"
          width={140}
          height={38}
        />
        <button
          className="mobile-menu__close"
          onClick={onClose}
          aria-label="Close navigation menu"
          ref={closeRef}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mobile-menu__nav">
        <Link href="/" className="mobile-menu__link" onClick={onClose}>
          Home
        </Link>
        <Link href="/about" className="mobile-menu__link" onClick={onClose}>
          About Dominique
        </Link>

        <div className="mobile-menu__link" style={{ cursor: 'default' }}>
          Services
        </div>
        <div className="mobile-menu__sub-links">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="mobile-menu__sub-link"
              onClick={onClose}
            >
              {service.name}
            </Link>
          ))}
        </div>

        <Link href="/resources" className="mobile-menu__link" onClick={onClose}>
          Resources
        </Link>
        <Link href="/faqs" className="mobile-menu__link" onClick={onClose}>
          FAQs
        </Link>
        <Link href="/stories" className="mobile-menu__link" onClick={onClose}>
          Client Stories
        </Link>
        <Link href="/contact" className="mobile-menu__link" onClick={onClose}>
          Contact
        </Link>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <Link
            href="/contact"
            className="btn btn--primary btn--full"
            onClick={onClose}
          >
            Request a Consultation
          </Link>
        </div>
      </nav>

      <div className="mobile-menu__footer">
        <div className="mobile-menu__contact">
          <p style={{ marginBottom: '4px' }}>
            <strong>(786) 390-6614</strong>
          </p>
          <p>DOMTHEOT@GMAIL.COM</p>
        </div>
        <div className="mobile-menu__social">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__social-link"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__social-link"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__social-link"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
