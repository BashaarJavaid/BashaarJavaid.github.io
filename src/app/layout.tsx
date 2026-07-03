import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.scss';
import { profile } from '@/data/profile';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import SmoothScroll from '@/components/SmoothScroll';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.portfolio),
  title: {
    default: `${profile.shortName} — ML / AI Engineer`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.summary,
  openGraph: {
    title: `${profile.shortName} — ML / AI Engineer`,
    description: profile.summary,
    url: profile.portfolio,
    siteName: profile.shortName,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#202020',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${plexMono.variable}`}>
      <body>
        <Loader />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
