// Branching-Trees fuer beide Varianten
// Icons referenzieren lucide-react Komponenten

export type FunnelVariant = 'gewerbe' | 'privat';

export type Option = {
  id: string;
  label: string;
  /** lucide-react icon name */
  icon: string;
  /** ID des naechsten Steps oder '__contact__' fuer Kontaktformular */
  next: string;
  /** Optionales Tag fuer Lead-Kategorisierung */
  tag?: string;
};

export type Step = {
  id: string;
  /** Hauptfrage (gross) */
  question: string;
  /** Optionale Sublabel (klein) */
  subtitle?: string;
  /** Bild, das den Schritt visuell unterstuetzt (Desktop seitlich, Mobile dezent) */
  mood?: string;
  options: Option[];
};

export type Tree = {
  variant: FunnelVariant;
  start: string;
  steps: Step[];
};

// ============================================================
// GEWERBE
// ============================================================

export const gewerbeTree: Tree = {
  variant: 'gewerbe',
  start: 'q1_gebaeude',
  steps: [
    {
      id: 'q1_gebaeude',
      question: 'Um welche Art Gebäude geht es?',
      subtitle: 'Damit wir die Anfrage passend einordnen können.',
      mood: '/images/header-02.png',
      options: [
        { id: 'buero', label: 'Büro / Verwaltung', icon: 'Building2', next: 'q2_problem' },
        { id: 'praxis', label: 'Praxis / Klinik / Kanzlei', icon: 'HeartPulse', next: 'q2_problem' },
        { id: 'laden', label: 'Ladengeschäft / Showroom', icon: 'Store', next: 'q2_problem' },
        { id: 'industrie', label: 'Industrie / Halle', icon: 'Factory', next: 'q2_problem' },
        { id: 'andere', label: 'Anderes', icon: 'MoreHorizontal', next: 'q2_problem' },
      ],
    },
    {
      id: 'q2_problem',
      question: 'Was ist Ihr größtes Problem?',
      subtitle: 'Wählen Sie das, was am meisten stört.',
      mood: '/images/header-06.png',
      options: [
        { id: 'hitze', label: 'Überhitzung im Sommer', icon: 'ThermometerSun', next: 'q3_groesse' },
        { id: 'blendung', label: 'Blendung an Arbeitsplätzen', icon: 'Sun', next: 'q3_groesse' },
        { id: 'sichtschutz', label: 'Sichtschutz von außen', icon: 'EyeOff', next: 'q3_groesse' },
        { id: 'uv', label: 'UV-Schäden an Mobiliar / Ware', icon: 'Palette', next: 'q3_groesse' },
        { id: 'mehreres', label: 'Mehreres davon', icon: 'Layers', next: 'q3_groesse' },
      ],
    },
    {
      id: 'q3_groesse',
      question: 'Wie groß ist die zu beklebende Glasfläche?',
      subtitle: 'Eine grobe Schätzung reicht völlig.',
      mood: '/images/header-04.png',
      options: [
        { id: 'bis_20', label: 'Bis 20 m²', icon: 'Square', next: '__contact__', tag: 'small' },
        { id: '20_100', label: '20 – 100 m²', icon: 'LayoutGrid', next: '__contact__', tag: 'mid' },
        { id: 'ueber_100', label: 'Über 100 m²', icon: 'Maximize', next: '__contact__', tag: 'enterprise' },
        { id: 'unklar', label: 'Noch unklar', icon: 'HelpCircle', next: '__contact__', tag: 'scoping' },
      ],
    },
  ],
};

// ============================================================
// PRIVAT
// ============================================================

export const privatTree: Tree = {
  variant: 'privat',
  start: 'q1_bereich',
  steps: [
    {
      id: 'q1_bereich',
      question: 'Welcher Bereich soll geschützt werden?',
      subtitle: 'Wir richten unser Angebot danach aus.',
      mood: '/images/header-05.png',
      options: [
        { id: 'wohnen', label: 'Wohn- / Essbereich', icon: 'Sofa', next: 'q2_problem' },
        { id: 'schlafen', label: 'Schlafzimmer', icon: 'BedDouble', next: 'q2_problem' },
        { id: 'wintergarten', label: 'Wintergarten / Dachfenster', icon: 'Sun', next: 'q2_problem' },
        { id: 'komplett', label: 'Komplettes Haus / Wohnung', icon: 'Home', next: 'q2_problem' },
        { id: 'andere', label: 'Anderes', icon: 'MoreHorizontal', next: 'q2_problem' },
      ],
    },
    {
      id: 'q2_problem',
      question: 'Was stört Sie am meisten?',
      subtitle: 'Wählen Sie den Hauptgrund.',
      mood: '/images/header-03.png',
      options: [
        { id: 'hitze', label: 'Zu hohe Temperaturen im Sommer', icon: 'ThermometerSun', next: 'q3_zeitrahmen' },
        { id: 'blendung', label: 'Sonnenblendung am Sofa / TV', icon: 'Sun', next: 'q3_zeitrahmen' },
        { id: 'uv', label: 'Möbel und Böden bleichen aus', icon: 'Palette', next: 'q3_zeitrahmen' },
        { id: 'einblick', label: 'Einblick von Nachbarn / Straße', icon: 'EyeOff', next: 'q3_zeitrahmen' },
        { id: 'mehreres', label: 'Mehreres davon', icon: 'Layers', next: 'q3_zeitrahmen' },
      ],
    },
    {
      id: 'q3_zeitrahmen',
      question: 'Wann soll es umgesetzt werden?',
      subtitle: 'So können wir Ihren Termin passend einplanen.',
      mood: '/images/header-01.png',
      options: [
        { id: 'asap', label: 'So bald wie möglich', icon: 'Zap', next: '__contact__', tag: 'hot' },
        { id: '1_3_monate', label: 'In 1 – 3 Monaten', icon: 'Calendar', next: '__contact__', tag: 'warm' },
        { id: 'unklar', label: 'Noch unklar', icon: 'HelpCircle', next: '__contact__', tag: 'cold' },
      ],
    },
  ],
};

export const trees: Record<FunnelVariant, Tree> = {
  gewerbe: gewerbeTree,
  privat: privatTree,
};

export function getTree(variant: FunnelVariant): Tree {
  return trees[variant];
}
