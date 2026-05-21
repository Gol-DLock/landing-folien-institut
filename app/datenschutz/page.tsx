import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>
        <p className="mt-2 text-sm text-navy-500">Stand: {new Date().toLocaleDateString('de-DE')}</p>

        <div className="prose prose-navy mt-8 max-w-none">
          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            1. Verantwortlicher
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Folien Institut <br />
            [Straße, Hausnummer] <br />
            [PLZ, Ort] <br />
            E-Mail: [E-Mail einsetzen] <br />
            Telefon: [Telefon einsetzen]
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            2. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Wir erheben Ihre personenbezogenen Daten ausschließlich auf Grundlage der
            Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG). Folgende
            Daten werden verarbeitet, wenn Sie unser Kontaktformular nutzen: Name, E-Mail-Adresse,
            Telefonnummer, optional Postleitzahl, Firmenname und Nachricht sowie die Antworten aus
            dem Anfragefunnel.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            3. Rechtsgrundlage und Zweck
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a
            DSGVO sowie zur Durchführung vorvertraglicher Maßnahmen gemäß Art. 6 Abs. 1 lit. b
            DSGVO. Zweck ist die Bearbeitung Ihrer Anfrage und die Erstellung eines individuellen
            Angebots.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            4. Speicherdauer
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Ihre Daten werden gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr
            erforderlich sind, spätestens jedoch nach Ablauf gesetzlicher Aufbewahrungspflichten.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            5. Empfänger und Auftragsverarbeiter
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Wir nutzen folgende Dienstleister, mit denen Auftragsverarbeitungsverträge bestehen:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-navy-700">
            <li>
              <strong>Vercel Inc.</strong> (Hosting der Webseite, Server in Frankfurt / EU)
            </li>
            <li>
              <strong>Resend Inc.</strong> (Versand der Anfrage-Mails)
            </li>
          </ul>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            6. Cookies
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Wir verwenden ausschließlich technisch notwendige Cookies sowie – nach Ihrer
            Einwilligung – optionale Analyse-Cookies. Ihre Einstellungen können Sie jederzeit über
            den Link „Cookie-Einstellungen“ im Seitenfuß ändern.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            7. Ihre Rechte
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit, Widerspruch und Beschwerde bei der zuständigen
            Aufsichtsbehörde. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die
            Zukunft widerrufen.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
            8. Kontakt zur Geltendmachung Ihrer Rechte
          </h2>
          <p className="mt-3 leading-relaxed text-navy-700">
            Wenden Sie sich an die oben genannte Adresse oder per E-Mail an [E-Mail einsetzen].
          </p>

          <p className="mt-12 rounded-xl bg-navy-50 p-4 text-xs text-navy-600">
            Hinweis: Diese Datenschutzerklärung ist ein Template und muss vor Veröffentlichung
            durch den Verantwortlichen geprüft und angepasst werden (insbesondere Verantwortlicher,
            Kontaktdaten, gegebenenfalls Datenschutzbeauftragter).
          </p>
        </div>
      </div>
    </main>
  );
}
