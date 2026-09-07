import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const displayFont = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: { default: 'Your Name — Advertising Measurement', template: '%s — Your Name' },
  description: 'Personal notes and observations on advertising measurement, accountability, and the changing media landscape.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Your Name — Advertising Measurement', description: 'Notes on making attention accountable.', type: 'website', url: 'https://yourdomain.com' },
  twitter: { card: 'summary_large_image', title: 'Your Name — Advertising Measurement', description: 'Notes on making attention accountable.' },
};

const personSchema = { '@context': 'https://schema.org', '@type': 'Person', name: 'Your Name', jobTitle: 'Advertising Measurement', url: 'https://yourdomain.com', sameAs: ['https://www.linkedin.com/in/yourprofile'] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${bodyFont.variable} ${displayFont.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />{children}</body></html>;
}
