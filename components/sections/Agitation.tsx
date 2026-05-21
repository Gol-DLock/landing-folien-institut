import Image from 'next/image';
import type { VariantContent } from '@/lib/variants';

export default function Agitation({ data }: { data: VariantContent['agitation'] }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white md:py-24">
      <Image
        src={data.image}
        alt={data.imageAlt}
        fill
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40"
      />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-sky-100">{data.text}</p>
        </div>
      </div>
    </section>
  );
}
