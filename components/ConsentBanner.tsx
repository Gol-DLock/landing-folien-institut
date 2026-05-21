'use client';

import { useState } from 'react';
import { useConsent } from '@/lib/consent';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function ConsentBanner() {
  const { consent, acceptAll, rejectAll, save, open, setOpen } = useConsent();
  const [detail, setDetail] = useState(false);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-3 z-40 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-navy-700 shadow-md ring-1 ring-navy-200 backdrop-blur hover:bg-white md:bottom-3"
        aria-label="Cookie-Einstellungen öffnen"
      >
        Cookies
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 animate-fade-in-up"
    >
      <div className="mx-auto max-w-3xl px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-navy-200">
          <div className="flex items-start gap-3 p-5 sm:p-6">
            <div className="flex-1">
              <h2 id="consent-title" className="font-display text-lg font-semibold text-navy-900">
                Datenschutz & Cookies
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">
                Wir verwenden technisch notwendige Cookies, damit diese Seite funktioniert.
                Optional helfen uns Analyse-Cookies, das Angebot zu verbessern. Sie entscheiden.
              </p>

              {detail && (
                <div className="mt-4 space-y-3 rounded-xl bg-navy-50 p-4">
                  <Row
                    title="Technisch notwendig"
                    desc="Sicherheit, Formular-Funktionalität, Cookie-Banner."
                    checked={true}
                    disabled
                    onChange={() => {}}
                  />
                  <Row
                    title="Analyse"
                    desc="Anonyme Nutzungsstatistiken, helfen uns die Seite zu verbessern."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <Row
                    title="Marketing"
                    desc="Wiedererkennung über Werbenetzwerke. Aktuell nicht aktiv im Einsatz."
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="order-2 inline-flex h-12 flex-1 items-center justify-center rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-navy-50 sm:order-1"
                >
                  Nur notwendige
                </button>
                {detail && (
                  <button
                    type="button"
                    onClick={() => save({ analytics, marketing })}
                    className="order-3 inline-flex h-12 flex-1 items-center justify-center rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-navy-50"
                  >
                    Auswahl speichern
                  </button>
                )}
                <button
                  type="button"
                  onClick={acceptAll}
                  className="order-1 inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 sm:order-3"
                >
                  Alle akzeptieren
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-navy-500">
                <button
                  type="button"
                  onClick={() => setDetail(d => !d)}
                  className="underline-offset-2 hover:underline"
                >
                  {detail ? 'Details ausblenden' : 'Einstellungen anpassen'}
                </button>
                <Link href="/datenschutz" className="underline-offset-2 hover:underline">
                  Datenschutzerklärung
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 rounded-full p-2 text-navy-400 hover:text-navy-700"
              aria-label="Schließen (nur notwendige werden gesetzt)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 rounded border-navy-300 text-sky-500 focus:ring-sky-500 disabled:opacity-50"
      />
      <span className="flex-1">
        <span className="block text-sm font-medium text-navy-900">{title}</span>
        <span className="block text-xs text-navy-600">{desc}</span>
      </span>
    </label>
  );
}
