import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Adzi Bilal - Frontend Developer",
    template: "%s | Adzi Bilal - Frontend Developer"
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  description: "Experienced Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. Passionate about user-focused design, high-performance websites, and seamless collaboration. Currently working at PT Motiolabs Digital Indonesia.",
  keywords: [
    "Frontend Developer",
    "React Developer", 
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer",
    "UI/UX Developer",
    "Code Reviewer",
    "Indonesia Developer",
    "Bandung Developer",
    "Portfolio",
    "Vue.js",
    "TailwindCSS",
    "ShadCN",
    "Machine Learning",
    "Full Stack Developer"
  ],
  authors: [{ name: "Adzi Bilal" }],
  creator: "Adzi Bilal",
  publisher: "Adzi Bilal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.adzibilal.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adzi Bilal - Frontend Developer",
    description: "Experienced Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. Passionate about user-focused design and high-performance websites.",
    url: "https://www.adzibilal.com",
    siteName: "Adzi Bilal Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adzi Bilal - Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adzi Bilal - Frontend Developer",
    description: "Experienced Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@adzibilal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoCondensed.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
