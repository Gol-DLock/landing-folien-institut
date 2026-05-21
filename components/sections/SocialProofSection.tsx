import SocialProof from '../SocialProof';
import type { VariantContent } from '@/lib/variants';

export default function SocialProofSection({ data }: { data: VariantContent['social'] }) {
  return (
    <section className="bg-navy-50/40 py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
        </div>
        <div className="mt-12">
          <SocialProof items={data.testimonials} />
        </div>
      </div>
    </section>
  );
}
