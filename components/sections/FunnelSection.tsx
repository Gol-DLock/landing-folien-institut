import Funnel from '../Funnel';
import type { VariantContent } from '@/lib/variants';
import type { Tree } from '@/lib/tree';

export default function FunnelSection({
  data,
  tree,
}: {
  data: VariantContent['funnel'];
  tree: Tree;
}) {
  return (
    <section id="funnel" className="bg-navy-50/40 py-16 md:py-24 scroll-mt-8">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            {data.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl md:text-5xl">
            {data.headline}
          </h2>
          <p className="mt-4 text-lg text-navy-700">{data.sub}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <Funnel tree={tree} />
        </div>
      </div>
    </section>
  );
}
