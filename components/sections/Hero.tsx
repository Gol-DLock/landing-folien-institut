import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { VariantContent } from '@/lib/variants';

export default function Hero({ data }: { data: VariantContent['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/60 to-white pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {data.eyebrow}
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl md:text-6xl">
              {data.headline}
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-navy-700">
              {data.sub}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#funnel"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:translate-y-[-1px] hover:bg-sky-600 hover:shadow-xl"
              >
                {data.cta}
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="#prozess"
                className="inline-flex h-14 items-center justify-center rounded-xl px-6 text-base font-medium text-navy-800 hover:bg-navy-50"
              >
                So läuft es ab
              </Link>
            </div>
            <p className="mt-4 text-xs text-navy-500">
              Kostenfrei & unverbindlich · Antwort innerhalb 24 Stunden · DSGVO-konform
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/10 ring-1 ring-navy-100">
              <Image
                src={data.image}
                alt={data.imageAlt}
                width={1200}
                height={900}
                priority
                className="h-full w-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            {/* dekorative Akzent-Form */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-2xl border-2 border-sky-500 md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
