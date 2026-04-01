import Footer from '@/components/layout/Footer';
import LenisWrapper from '@/components/layout/LenisWrapper';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hotelsur.es'),
  title: {
    default: 'Hotel Sur',
    template: '%s | Hotel Sur',
  },
  description:
    'Hotel Sur. Rock alternativo y electrónica. Sobre la Gravedad (Parte 1): nueve canciones sobre la pérdida. Cuenca, España.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Hotel Sur',
    title: 'Hotel Sur',
    description:
      'Rock alternativo y electrónica. Sobre la Gravedad (Parte 1): nueve canciones sobre la pérdida.',
    url: 'https://hotelsur.es',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Sur',
    description:
      'Rock alternativo y electrónica. Sobre la Gravedad (Parte 1): nueve canciones sobre la pérdida.',
  },
  alternates: {
    canonical: 'https://hotelsur.es',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Hotel Sur',
  url: 'https://hotelsur.es',
  genre: ['Rock alternativo', 'Electrónica'],
  foundingLocation: {
    '@type': 'Place',
    name: 'Cuenca, España',
  },
  album: {
    '@type': 'MusicAlbum',
    name: 'Sobre la Gravedad (Parte 1)',
    albumReleaseType: 'https://schema.org/AlbumRelease',
  },
  sameAs: [
    'https://www.instagram.com/hotelsur/',
    'https://open.spotify.com/intl-es/artist/5ZsW4wbMl8qYFZ0L9xvBeu',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='antialiased min-h-screen flex flex-col overflow-x-hidden'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-4 focus:left-4 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded'
        >
          Saltar al contenido
        </a>
        <LenisWrapper>
          <Navbar />
          <main id='main-content' className='grow'>
            {children}
          </main>
          <Footer />
        </LenisWrapper>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
