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
  title: 'NestGuard - Pest Control Services',
  description: 'Professional commercial and residential pest elimination services. Transparent pricing, instant online booking, and certified eco-safe treatments.',
  keywords: ['pest control SaaS', 'termite treatment', 'bed bug elimination', 'local exterminator'],
  openGraph: {
    title: 'NestGuard - Pest Control Services',
    description: 'Book certified pest control services online instantly.',
    url: 'https://nestguardpest.vercel.app',
    siteName: 'NestGuard',
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
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}