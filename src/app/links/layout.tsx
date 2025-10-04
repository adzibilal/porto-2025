import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links - Adzi Bilal',
  description: 'Kumpulan link penting dari Adzi Bilal - Frontend Developer',
  openGraph: {
    title: 'Links - Adzi Bilal',
    description: 'Kumpulan link penting dari Adzi Bilal - Frontend Developer',
    type: 'website',
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="links-page">
      {children}
    </div>
  );
}
