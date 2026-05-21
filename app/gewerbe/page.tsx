import type { Metadata } from 'next';
import VariantPage from '@/components/VariantPage';

export const metadata: Metadata = {
  title: 'Sonnenschutzfolien für Gewerbe',
  description:
    'Hitze, Blendung und UV-Schäden in Büros, Praxen, Showrooms und Hallen. Bruxsafol-Partner, 15 Jahre Erfahrung. Bremen, Ostfriesland, Hannover, Hamburg.',
};

export default function Gewerbe() {
  return <VariantPage variant="gewerbe" />;
}
