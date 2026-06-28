import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'PestControl Pro | Eco-Friendly Smart Pest Management',
  description: 'Professional commercial and residential pest elimination services. Transparent pricing, instant online booking, and certified eco-safe treatments.',
  keywords: ['pest control SaaS', 'termite treatment', 'bed bug elimination', 'local exterminator'],
  openGraph: {
    title: 'PestControl Pro | Smart Pest Management',
    description: 'Book certified pest control services online instantly.',
    url: 'https://yourdomain.com',
    siteName: 'PestControl Pro',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
