import Image from 'next/image';
import Link from 'next/link';
import Hero from './sections/Hero';
import TrustRow from './sections/TrustRow';
import PainPoints from './sections/PainPoints';
import Agitation from './sections/Agitation';
import FunnelSection from './sections/FunnelSection';
import Process from './sections/Process';
import SocialProofSection from './sections/SocialProofSection';
import FinalCTA from './sections/FinalCTA';
import StickyCTA from './StickyCTA';
import { getVariant } from '@/lib/variants';
import { getTree, type FunnelVariant } from '@/lib/tree';

export default function VariantPage({ variant }: { variant: FunnelVariant }) {
  const data = getVariant(variant);
  const tree = getTree(variant);

  return (
    <main className="relative">
      {/* Logo-Header: minimal, kein Menü (Landingpage-Konvention) */}
      <header className="absolute inset-x-0 top-0 z-20 py-5">
        <div className="container-page flex items-center justify-between">
          <Link href="/" aria-label="Zur Auswahl Gewerbe / Privat">
            <Image src="/logo.png" alt="Folien Institut" width={56} height={56} priority />
          </Link>
          <p className="hidden text-xs font-medium text-navy-600 sm:block">
            Bremen · Ostfriesland · Hannover · Hamburg
          </p>
        </div>
      </header>

      <Hero data={data.hero} />
      <TrustRow />
      <PainPoints data={data.pain} />
      <Agitation data={data.agitation} />
      <FunnelSection data={data.funnel} tree={tree} />
      <Process data={data.process} />
      <SocialProofSection data={data.social} />
      <FinalCTA data={data.final} />

      <StickyCTA label={data.final.cta} />
    </main>
  );
}
