import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import UsePWA from '@/components/UsePWA';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import LenisProvider from '@/components/providers/LenisProvider';
import { siteConfig } from '@/config/site.config';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Cola', 'Cola的个人小站', '可乐爱宅着'],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LenisProvider>
          <div id="app" className="mx-auto max-w-3xl">
            <Header />
            <Main>{children}</Main>
          </div>
          <div id="catalog-portal"></div>
        </LenisProvider>
      </body>
      <UsePWA />
    </html>
  );
}
