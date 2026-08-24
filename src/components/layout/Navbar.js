'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import MobileMenu from './MobileMenu';

const services = [
  {
    name: 'Occupational Therapy',
    href: '/occupational-therapy',
    description: 'Pediatric OT services',
    color: 'green',
  },
  {
    name: 'Doula Services',
    href: '/doula-services',
    description: 'Birth & postpartum support',
    color: 'sage',
  },
  {
    name: 'Pregnancy & Postpartum',
    href: '/pregnancy-postpartum',
    description: 'Full-journey care',
    color: 'magenta',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Stories', href: '/stories' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="nav"
        role="navigation"
        aria-label="Main navigation"
        style={{
          boxShadow: scrolled ? 'var(--shadow-nav)' : 'none',
        }}
      >
        <div className="nav__inner">
          <Link href="/" aria-label="Dom the OT — Home">
            <Image
              src="/images/logo.svg"
              alt="Dom the OT"
              width={200}
              height={60}
              className="nav__logo"
              priority
            />
          </Link>

          <div className="nav__links">
            <Link href="/" className="nav__link">
              Home
            </Link>
            <Link href="/about" className="nav__link">
              About
            </Link>

            {/* Services Dropdown */}
            <div className="nav__dropdown">
              <button
                className="nav__link nav__dropdown-trigger"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={14} />
              </button>
              <div className="nav__dropdown-menu" role="menu">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="nav__dropdown-item"
                    role="menuitem"
                  >
                    <span
                      className={`nav__dropdown-item-dot nav__dropdown-item-dot--${service.color}`}
                    />
                    <div>
                      <div className="nav__dropdown-item-text">{service.name}</div>
                      <div className="nav__dropdown-item-desc">{service.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/resources" className="nav__link">
              Resources
            </Link>
            <Link href="/faqs" className="nav__link">
              FAQs
            </Link>
            <Link href="/stories" className="nav__link">
              Stories
            </Link>
            <Link href="/contact" className="nav__link">
              Contact
            </Link>
          </div>

          <Link href="/contact" className="btn btn--primary btn--sm nav__cta">
            Request a Consultation
          </Link>

          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        services={services}
      />
    </>
  );
}
