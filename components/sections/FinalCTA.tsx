import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { VariantContent } from '@/lib/variants';

export default function FinalCTA({ data }: { data: VariantContent['final'] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-2xl bg-navy-900 px-6 py-12 text-center text-white shadow-2xl shadow-navy-900/10 sm:px-12 md:py-16">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-sky-100">{data.sub}</p>
          <Link
            href="#funnel"
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:translate-y-[-1px] hover:bg-sky-400"
          >
            {data.cta}
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
