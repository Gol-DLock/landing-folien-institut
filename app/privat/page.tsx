import type { Metadata } from 'next';
import VariantPage from '@/components/VariantPage';

export const metadata: Metadata = {
  title: 'Sonnenschutzfolien für Ihr Zuhause',
  description:
    'Schluss mit Hitze, Blendung und ausbleichenden Möbeln. Sonnenschutzfolien für Privathäuser und Wohnungen. Bremen, Ostfriesland, Hannover, Hamburg.',
};

export default function Privat() {
  return <VariantPage variant="privat" />;
}
