import { ShieldCheck, Award, Wrench, MapPin, type LucideIcon } from 'lucide-react';

type Badge = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const badges: Badge[] = [
  {
    icon: Award,
    title: 'Bruxsafol-Partner',
    text: 'Premium-Hersteller aus Deutschland',
  },
  {
    icon: ShieldCheck,
    title: '15 Jahre Erfahrung',
    text: 'Über 2.800 abgeschlossene Projekte',
  },
  {
    icon: Wrench,
    title: 'Eigene Monteure',
    text: 'Keine Subunternehmer, sauberes Arbeiten',
  },
  {
    icon: MapPin,
    title: 'Bremen + Umland',
    text: 'Ostfriesland, Hannover, Hamburg',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {badges.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="flex flex-col items-start gap-2 rounded-xl border border-navy-100 bg-white/60 p-4 backdrop-blur-sm"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-900">{title}</p>
            <p className="text-xs text-navy-600">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
