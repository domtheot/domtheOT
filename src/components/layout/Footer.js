import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin, LogIn } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div>
            <div className="footer__logo-wrap">
              <Image
                src="/images/logo_no_llc.png"
                alt="Dom the OT Pediatric Occupational Therapy"
                width={180}
                height={89}
                className="footer__logo"
              />
            </div>
            <p className="footer__brand-description">
              Empowering children and families through evidence-based occupational
              therapy, compassionate doula support, and culturally relevant care.
            </p>
            <div className="footer__social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Follow on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Follow on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Subscribe on YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="footer__heading">Services</h3>
            <Link href="/occupational-therapy" className="footer__link">
              Occupational Therapy
            </Link>
            <Link href="/doula-services" className="footer__link">
              Doula Services
            </Link>
            <Link href="/pregnancy-postpartum" className="footer__link">
              Pregnancy & Postpartum
            </Link>
            <Link href="/resources" className="footer__link">
              Resources
            </Link>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="footer__heading">Company</h3>
            <Link href="/about" className="footer__link">
              About Dominique
            </Link>
            <Link href="/stories" className="footer__link">
              Client Stories
            </Link>
            <Link href="/faqs" className="footer__link">
              FAQs
            </Link>
            <Link href="/contact" className="footer__link">
              Contact
            </Link>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="footer__heading">Get in Touch</h3>
            <a href="tel:+17863906614" className="footer__link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} /> (786) 390-6614
            </a>
            <a href="mailto:DOMTHEOT@GMAIL.COM" className="footer__link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} /> DOMTHEOT@GMAIL.COM
            </a>
            <span className="footer__link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} /> Florida · Treasure Coast
            </span>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <Link href="/contact" className="btn btn--primary btn--sm">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Dom the OT LLC. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link href="/privacy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer__legal-link">
              Terms of Service
            </Link>
            <Link href="/admin" className="footer__legal-link footer__admin-login" title="Admin Portal Sign In" aria-label="Admin Portal Sign In">
              <LogIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
