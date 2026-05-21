// Inhaltliche Daten pro Variante.
// Bleibt getrennt von tree.ts (Branching-Logik).

import type { FunnelVariant } from './tree';

export type Testimonial = {
  name: string;
  city: string;
  role?: string;
  quote: string;
  initials: string;
};

export type PainPoint = {
  icon: string; // lucide name
  title: string;
  text: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

export type VariantContent = {
  variant: FunnelVariant;
  // Hero
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    cta: string;
    image: string;
    imageAlt: string;
  };
  // Pain Points
  pain: {
    eyebrow: string;
    headline: string;
    points: PainPoint[];
  };
  // Agitation
  agitation: {
    headline: string;
    text: string;
    image: string;
    imageAlt: string;
  };
  // Funnel-Section
  funnel: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  // Process
  process: {
    headline: string;
    sub: string;
    steps: ProcessStep[];
  };
  // Social Proof
  social: {
    headline: string;
    testimonials: Testimonial[];
  };
  // Final CTA
  final: {
    headline: string;
    sub: string;
    cta: string;
  };
};

// ============================================================
// GEWERBE
// ============================================================

const gewerbe: VariantContent = {
  variant: 'gewerbe',
  hero: {
    eyebrow: 'Sonnenschutzfolien für Gewerbe',
    headline: 'Endlich angenehme Räume – ohne Klima-Vollkosten.',
    sub: 'Wir reduzieren Hitze, Blendung und UV-Strahlung an Ihren Glasflächen. Schnelle Montage, präzise Ausführung, sichtbare Ergebnisse.',
    cta: 'Kostenfreies Angebot in 60 Sekunden',
    image: '/images/header-02.jpg',
    imageAlt: 'Modernes Bürogebäude mit großzügigen Glasflächen, Sonnenschutz durch Folientechnik',
  },
  pain: {
    eyebrow: 'Bekannte Probleme',
    headline: 'Sie kennen das vermutlich.',
    points: [
      {
        icon: 'ThermometerSun',
        title: '28 °C am Schreibtisch',
        text: 'Ab Mittag steigt die Temperatur in den Büros so weit, dass die Klimaanlage nicht mehr hinterherkommt. Konzentration und Produktivität sinken hörbar.',
      },
      {
        icon: 'Sun',
        title: 'Blendung auf Bildschirmen',
        text: 'Mitarbeitende verschieben Schreibtische, hängen Pappen vor die Fenster, schließen Jalousien. Das Tageslicht – eigentlich ein Vorteil – wird zum Störfaktor.',
      },
      {
        icon: 'Banknote',
        title: 'Klimakosten, die nichts bringen',
        text: 'Die Klimaanlage läuft auf Hochtouren. Aber das eigentliche Problem – die Sonneneinstrahlung durch die Scheiben – bleibt ungelöst. Geld verpufft.',
      },
    ],
  },
  agitation: {
    headline: 'Jeder Sommer kostet Sie mehr, als Sie denken.',
    text: 'Studien zeigen: Bei Innentemperaturen über 26 °C sinkt die Arbeitsleistung um bis zu zehn Prozent. Pro Mitarbeiter, pro Stunde. Hinzu kommen ausbleichende Möbel, beschädigte Ware im Showroom und steigende Energierechnungen. Sonnenschutzfolien stoppen das Problem dort, wo es entsteht: am Glas.',
    image: '/images/header-04.jpg',
    imageAlt: 'Hochformatige Glasfassade aus Untersicht',
  },
  funnel: {
    eyebrow: 'In 60 Sekunden zum Angebot',
    headline: 'So bekommen Sie Ihr individuelles Angebot.',
    sub: 'Drei kurze Fragen. Keine Vorkasse, keine Verpflichtung. Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung.',
  },
  process: {
    headline: 'So läuft die Zusammenarbeit ab.',
    sub: 'Vom ersten Klick bis zur fertigen Folie – transparent und schnell.',
    steps: [
      {
        number: '01',
        title: 'Anfrage & Erstgespräch',
        text: 'Sie senden uns Ihre Angaben über das Formular. Innerhalb von 24 Stunden meldet sich ein Experte zur kostenlosen Erstberatung.',
      },
      {
        number: '02',
        title: 'Aufmaß vor Ort',
        text: 'Wir kommen zu Ihnen, prüfen die Glasflächen und empfehlen die passende Folie – abgestimmt auf Ausrichtung, Nutzung und Budget.',
      },
      {
        number: '03',
        title: 'Festpreis-Angebot',
        text: 'Sie erhalten ein verbindliches, transparentes Angebot. Keine versteckten Kosten, kein Verhandlungspoker.',
      },
      {
        number: '04',
        title: 'Saubere Montage',
        text: 'Unsere geschulten Monteure verkleben die Folien staubfrei und präzise. Der Betrieb läuft währenddessen weiter – oft sogar parallel.',
      },
    ],
  },
  social: {
    headline: 'Über 800 zufriedene Gewerbekunden im Norden.',
    testimonials: [
      {
        name: 'Markus Brüggemann',
        city: 'Bremen',
        role: 'Geschäftsführer, Brüggemann Immobilien',
        initials: 'MB',
        quote: 'Wir hatten ein massives Hitzeproblem in unseren Süd-Büros. Nach der Folierung lag die Innentemperatur konstant fünf bis sieben Grad niedriger. Die Klimaanlage läuft seitdem deutlich entspannter.',
      },
      {
        name: 'Dr. Annika Wedel',
        city: 'Oldenburg',
        role: 'Inhaberin, Praxis Wedel & Kollegen',
        initials: 'AW',
        quote: 'Die Patienten im Wartebereich waren morgens stundenlang geblendet. Das Folien Institut hat das Problem in einem halben Tag gelöst. Sauber, freundlich, kompetent.',
      },
      {
        name: 'Jens Köhler',
        city: 'Hannover',
        role: 'Filialleiter, Möbelhaus Köhler',
        initials: 'JK',
        quote: 'Im Showroom blichen die Stoffmuster aus, die Ware verlor Farbe. Mit der UV-Folie ist das Geschichte – und unsere Klimakosten sind spürbar gesunken.',
      },
    ],
  },
  final: {
    headline: 'Bereit für angenehmere Räume?',
    sub: 'Schicken Sie uns Ihre Anfrage – wir melden uns innerhalb von 24 Stunden.',
    cta: 'Jetzt kostenfreies Angebot anfordern',
  },
};

// ============================================================
// PRIVAT
// ============================================================

const privat: VariantContent = {
  variant: 'privat',
  hero: {
    eyebrow: 'Sonnenschutzfolien für Ihr Zuhause',
    headline: 'Kühle Räume. Kein Blick von außen. Kein Ausbleichen.',
    sub: 'Wir bringen Sonnenschutzfolien direkt aufs Glas – schnell, sauber und ohne Bauchaos. Sichtbare Wirkung ab dem ersten Sonnentag.',
    cta: 'In 60 Sekunden zum Angebot',
    image: '/images/header-05.jpg',
    imageAlt: 'Modernes Einfamilienhaus mit großen Glasflächen in der Abendsonne',
  },
  pain: {
    eyebrow: 'Vielleicht kommt Ihnen das bekannt vor',
    headline: 'Im Sommer ein anderes Zuhause.',
    points: [
      {
        icon: 'ThermometerSun',
        title: 'Das Wohnzimmer wird zur Sauna',
        text: 'Ab Mai stauen sich die Temperaturen hinter den Glasflächen. Nachts schlafen unmöglich, tagsüber Rollläden runter – das eigene Zuhause fühlt sich an wie verriegelt.',
      },
      {
        icon: 'Eye',
        title: 'Der Blick von der Straße',
        text: 'Bodentiefe Fenster sind schön. Aber jeder Spaziergänger schaut direkt ins Wohnzimmer. Gardinen vor jedem Fenster wollen Sie auch nicht.',
      },
      {
        icon: 'Palette',
        title: 'Möbel und Boden bleichen aus',
        text: 'Der teure Eichenparkett, das neue Sofa, der Echtholz-Esstisch – nach zwei Sommern sieht man dem Wohnzimmer die Sonne an. Und das tut weh.',
      },
    ],
  },
  agitation: {
    headline: 'Sonnenschutz von innen reicht nicht.',
    text: 'Plissees, Rollos und Gardinen halten nur die Sonne ab, nachdem sie bereits durch das Glas ist. Die Wärme staut sich genauso, die UV-Strahlung gelangt weiter zum Boden, der Einblick von außen bleibt – außer alles ist permanent geschlossen. Eine professionell verklebte Sonnenschutzfolie löst alle drei Probleme zusammen, direkt am Glas.',
    image: '/images/header-03.jpg',
    imageAlt: 'Wohngebäude mit modernen Glasfronten',
  },
  funnel: {
    eyebrow: 'In 60 Sekunden zum Angebot',
    headline: 'So bekommen Sie Ihr individuelles Angebot.',
    sub: 'Drei kurze Fragen. Keine Vorkasse, keine Verpflichtung. Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung.',
  },
  process: {
    headline: 'So einfach läuft es ab.',
    sub: 'Von der Anfrage bis zur fertigen Folie – meist innerhalb von zwei Wochen.',
    steps: [
      {
        number: '01',
        title: 'Anfrage senden',
        text: 'Drei Klicks im Formular, ein paar Kontaktdaten. Innerhalb von 24 Stunden hören Sie von uns.',
      },
      {
        number: '02',
        title: 'Termin vor Ort',
        text: 'Wir kommen zu Ihnen, messen aus und beraten Sie zu der passenden Folie – ohne Verkaufsdruck.',
      },
      {
        number: '03',
        title: 'Festes Angebot',
        text: 'Sie bekommen ein verbindliches Angebot zum Festpreis. Klar, transparent, ohne Sternchen-Klauseln.',
      },
      {
        number: '04',
        title: 'Montage in einem Tag',
        text: 'Die meisten Privatprojekte sind an einem einzigen Tag abgeschlossen. Wir arbeiten sauber – keine Klebereste, kein Staub.',
      },
    ],
  },
  social: {
    headline: 'Über 2.000 zufriedene Privatkunden in Norddeutschland.',
    testimonials: [
      {
        name: 'Stefanie Hellmer',
        city: 'Bremen-Schwachhausen',
        initials: 'SH',
        quote: 'Unser Wohnzimmer ging nach Süden – im Sommer war es nicht auszuhalten. Seit der Folierung ist es deutlich kühler, und von außen sieht man nichts mehr. Wir wären schon viel früher darauf gekommen sollen.',
      },
      {
        name: 'Thomas Janßen',
        city: 'Leer (Ostfriesland)',
        initials: 'TJ',
        quote: 'Saubere Arbeit, freundliches Team, fairer Preis. Der Wintergarten ist im Sommer endlich wieder nutzbar – das hat sich für uns sofort gerechnet.',
      },
      {
        name: 'Familie Petersen',
        city: 'Hamburg-Eppendorf',
        initials: 'FP',
        quote: 'Wir hatten Angst vor einem getönten Look. Die Folie ist von innen kaum sichtbar, von außen ein dezenter Spiegeleffekt. Genau richtig für unser Haus.',
      },
    ],
  },
  final: {
    headline: 'Endlich wieder ein angenehmes Zuhause.',
    sub: 'Drei Klicks ins Formular – wir melden uns innerhalb von 24 Stunden.',
    cta: 'Jetzt kostenfreies Angebot anfordern',
  },
};

export const variants: Record<FunnelVariant, VariantContent> = {
  gewerbe,
  privat,
};

export function getVariant(variant: FunnelVariant): VariantContent {
  return variants[variant];
}
