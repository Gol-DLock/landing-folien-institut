import { Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/variants';

export default function SocialProof({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map(t => (
        <figure
          key={t.name}
          className="relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100"
        >
          <Quote className="h-7 w-7 text-sky-200" strokeWidth={1.5} />
          <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-800">
            {t.quote}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-white">
              {t.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">{t.name}</p>
              <p className="text-xs text-navy-600">
                {t.role ? `${t.role} · ${t.city}` : t.city}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
