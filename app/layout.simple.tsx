// Simple layout without GraphQL dependencies for testing
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Norko Infrared Heaters',
  description: 'Premium infrared heating solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  );
}
