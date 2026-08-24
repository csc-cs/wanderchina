import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'WanderChina · Discover China Like a Local',
    template: '%s · WanderChina',
  },
  description:
    'English guides, real traveler stories, and a 24/7 AI travel companion — all in one place.',
  keywords: ['China travel', 'English travel guide', 'China tourism', 'Beijing', 'Shanghai', 'Xi\'an', 'Chengdu'],
  openGraph: {
    title: 'WanderChina · Discover China Like a Local',
    description: 'English guides, real traveler stories, and a 24/7 AI travel companion — all in one place.',
    url: 'https://wanderchina.com',
    siteName: 'WanderChina',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wanderchina.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WanderChina — Discover China Like a Local',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderChina · Discover China Like a Local',
    description: 'English guides, real traveler stories, and a 24/7 AI travel companion — all in one place.',
    images: ['https://wanderchina.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-brand-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}