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
  metadataBase: new URL("https://itc-products.com"),
  title: {
    default: "ITC | Industrial Tractor Components",
    template: "%s | ITC",
  },
  description:
    "ITC designs rugged LED work lights, mounting systems, and tractor components for demanding outdoor conditions and low-light jobs.",
  openGraph: {
    title: "ITC | Industrial Tractor Components",
    description:
      "Rugged LED work lights and mounting systems designed for tractor ROPS installations.",
    url: "https://itc-products.com",
    siteName: "ITC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITC | Industrial Tractor Components",
    description:
      "Rugged LED work lights and mounting systems designed for tractor ROPS installations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
