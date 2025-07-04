import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/components/ApolloWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Norko Infrared Heaters | Premium Heating Solutions",
  description: "Discover Norko's premium range of infrared heaters. Energy-efficient, stylish, and perfect for modern homes and offices.",
  keywords: "infrared heaters, electric heating, energy efficient, Norko, panel heaters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
