import type { VariantContent } from '@/lib/variants';

export default function Process({ data }: { data: VariantContent['process'] }) {
  return (
    <section id="prozess" className="py-16 md:py-24 scroll-mt-8">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
          <p className="mt-4 text-lg text-navy-700">{data.sub}</p>
        </div>

        <div className="relative mt-14">
          {/* dezente Verbindungslinie auf Desktop */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-12 hidden h-px w-[calc(100%-12rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-200 to-transparent lg:block"
          />
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.steps.map(s => (
              <li key={s.number} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 font-display text-base font-semibold text-white ring-4 ring-white">
                  {s.number}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
