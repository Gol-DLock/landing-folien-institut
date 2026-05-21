import type { VariantContent } from '@/lib/variants';
import { getIcon } from '../icons';

export default function PainPoints({ data }: { data: VariantContent['pain'] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            {data.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {data.points.map(p => {
            const Icon = getIcon(p.icon);
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-navy-700">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
