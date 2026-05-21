'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function StickyCTA({ label = 'Jetzt Angebot anfordern' }: { label?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.5;
      const funnelEl = document.getElementById('funnel');
      let pastFunnel = false;
      if (funnelEl) {
        const rect = funnelEl.getBoundingClientRect();
        pastFunnel = rect.bottom < 0;
      }
      setVisible(window.scrollY > trigger && !pastFunnel);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#funnel"
      className={`fixed inset-x-3 bottom-3 z-30 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      } flex h-14 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300`}
    >
      {label}
      <ChevronRight className="h-5 w-5" />
    </a>
  );
}
