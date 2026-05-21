import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <main className="bg-white py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-navy-600 hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Zur Startseite
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Impressum
        </h1>

        <div className="mt-8 space-y-6 text-navy-700">
          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Angaben nach § 5 TMG</h2>
            <p className="mt-3 leading-relaxed">
              Folien Institut <br />
              [Straße und Hausnummer] <br />
              [PLZ und Ort] <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Vertreten durch</h2>
            <p className="mt-3 leading-relaxed">[Name der/des Geschäftsführer:in]</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Kontakt</h2>
            <p className="mt-3 leading-relaxed">
              Telefon: [Telefonnummer] <br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">Register</h2>
            <p className="mt-3 leading-relaxed">
              Registergericht: [Amtsgericht] <br />
              Registernummer: [HRB-Nummer] <br />
              Umsatzsteuer-ID: [USt-ID]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-navy-900">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3 leading-relaxed">
              [Name] <br />
              [Anschrift wie oben]
            </p>
          </section>

          <p className="mt-12 rounded-xl bg-navy-50 p-4 text-xs text-navy-600">
            Hinweis: Dies ist ein Template. Vor Veröffentlichung müssen alle Platzhalter durch die
            rechtlich verbindlichen Daten des Verantwortlichen ersetzt werden.
          </p>
        </div>
      </div>
    </main>
  );
}
