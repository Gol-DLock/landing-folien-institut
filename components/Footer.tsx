'use client';

import Link from 'next/link';
import { useConsent } from '@/lib/consent';

export default function Footer() {
  const { setOpen } = useConsent();

  return (
    <footer className="border-t border-navy-100 bg-white py-10">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-base font-semibold text-navy-900">Folien Institut</p>
            <p className="mt-1 text-sm text-navy-600">
              Sonnenschutzfolien für Bremen, Ostfriesland, Hannover und Hamburg.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-700">
            <Link href="/impressum" className="hover:text-sky-600">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-sky-600">
              Datenschutz
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-left hover:text-sky-600"
            >
              Cookie-Einstellungen
            </button>
          </nav>
        </div>
        <p className="mt-8 text-xs text-navy-500">
          © {new Date().getFullYear()} Folien Institut. Landingpage realisiert von{' '}
          <a
            href="https://turm.media"
            target="_blank"
            rel="noopener"
            className="underline-offset-2 hover:underline"
          >
            Turm Media
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
