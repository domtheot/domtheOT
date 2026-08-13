import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL('https://domtheot.com'),
  title: {
    default: 'Dom the OT — Maternal Wellness & Pediatric OT by Dominique Alexis',
    template: '%s | Dom the OT',
  },
  description:
    'Dominique Alexis is a board-certified occupational therapist and certified birth & postpartum doula based in Florida. Providing evidence-based pediatric OT, doula services, and family-centered support for children ages 0–21.',
  keywords: [
    'pediatric occupational therapy',
    'doula services',
    'maternal wellness',
    'early intervention',
    'family support',
    'Florida OT',
    'Treasure Coast',
    'Dominique Alexis',
    'Dom the OT',
  ],
  authors: [{ name: 'Dominique Alexis' }],
  creator: 'Dom the OT LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://domtheot.com',
    siteName: 'Dom the OT',
    title: 'Dom the OT — Maternal Wellness & Pediatric OT',
    description:
      'Board-certified occupational therapist and certified doula providing evidence-based, culturally relevant services for children and families.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dom the OT — Maternal Wellness & Pediatric Occupational Therapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dom the OT — Maternal Wellness & Pediatric OT',
    description:
      'Board-certified occupational therapist and certified doula providing evidence-based, culturally relevant services for children and families.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
