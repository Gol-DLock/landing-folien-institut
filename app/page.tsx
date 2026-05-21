import Image from 'next/image';
import Link from 'next/link';
import { Building2, Home, ChevronRight, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Folien Institut · Bremen',
  description: 'Sonnenschutzfolien für Gewerbe und Privat in Bremen und Umland.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-50/60 to-white">
      <div className="container-page flex min-h-screen flex-col">
        <header className="flex items-center justify-between py-6">
          <Image src="/logo.png" alt="Folien Institut" width={64} height={64} priority />
          <p className="text-xs text-navy-600">Bremen · Ostfriesland · Hannover · Hamburg</p>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-16">
          <h1 className="max-w-3xl text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl md:text-6xl">
            Sonnenschutzfolien – für wen sind Sie unterwegs?
          </h1>
          <p className="mt-5 max-w-xl text-center text-lg text-navy-700">
            Wählen Sie Ihren Bereich – wir zeigen Ihnen die passende Lösung.
          </p>

          <div className="mt-12 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
            <Choice
              href="/privat"
              icon={Home}
              title="Privat"
              text="Für Ihr Zuhause: Wohnzimmer, Schlafzimmer, Wintergarten."
            />
            <Choice
              href="/gewerbe"
              icon={Building2}
              title="Gewerbe"
              text="Für Ihr Unternehmen: Büro, Praxis, Ladenfläche, Halle."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Choice({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-navy-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-xl"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <div>
        <h2 className="font-display text-2xl font-semibold text-navy-900">{title}</h2>
        <p className="mt-1 text-navy-700">{text}</p>
      </div>
      <span className="mt-auto inline-flex items-center text-sm font-semibold text-sky-600 group-hover:text-sky-700">
        Zur Seite
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
