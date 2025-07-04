/**
 * Root Layout for Norko Infrared Heaters E-commerce Site
 * 
 * This is the main layout that wraps all pages in the application.
 * It provides the basic HTML structure and includes global styles.
 */

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-manrope'
});

export const metadata: Metadata = {
  title: {
    default: 'Norko Infrared Heaters',
    template: '%s | Norko'
  },
  description: 'Premium infrared heating solutions for homes, offices, and commercial spaces.',
  keywords: ['infrared heaters', 'heating', 'energy efficient', 'Norko', 'premium heating'],
  authors: [{ name: 'Norko Team' }],
  creator: 'Norko',
  metadataBase: new URL(process.env.CANONICAL_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}


