import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://graphixmo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GraphixMo — Create Stunning Flyers & Social Media Designs",
    template: "%s | GraphixMo",
  },
  description:
    "GraphixMo makes it easy to create beautiful flyers, social media posts, and marketing designs in minutes. No design skills needed — just drag, drop, and publish.",
  keywords: [
    "design tool",
    "flyer maker",
    "social media design",
    "graphic design",
    "marketing templates",
    "GraphixMo",
  ],
  authors: [{ name: "GraphixMo" }],
  creator: "GraphixMo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GraphixMo",
    title: "GraphixMo — Create Stunning Flyers & Social Media Designs",
    description:
      "Create beautiful flyers, social media posts, and marketing designs in minutes. No design skills needed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GraphixMo — Easy design for everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GraphixMo — Create Stunning Flyers & Social Media Designs",
    description:
      "Create beautiful flyers, social media posts, and marketing designs in minutes.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GraphixMo",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  description:
    "An easy-to-use web app for creating flyers, social media designs, and marketing graphics.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
