import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { ConsentProvider } from '@/lib/consent';
import ConsentBanner from '@/components/ConsentBanner';
import Footer from '@/components/Footer';
import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Folien Institut · Sonnenschutzfolien für Bremen & Umland',
    template: '%s · Folien Institut',
  },
  description:
    'Professionelle Sonnenschutzfolien für Gewerbe und Privat. Bremen, Ostfriesland, Hannover, Hamburg. Bruxsafol-Partner, 15 Jahre Erfahrung.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Folien Institut · Sonnenschutzfolien',
    description: 'Hitze, Blendung und UV-Strahlung professionell beseitigen.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F2D52',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body className="bg-white">
        <ConsentProvider>
          {children}
          <Footer />
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
