/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteSection } from "@/utils/cms";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontDisplay = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSection<any>('seo')

  const title = seo.siteTitle || "Apargo"
  const description = seo.defaultDescription || "Apargo Design System"
  const keywords = seo.keywords || ""
  const ogImage = seo.ogImage || "/og-image.png"
  const ogSiteName = seo.ogSiteName || "Apargo"
  const twitterCard = seo.twitterCard || "summary_large_image"
  const canonicalBase = seo.canonicalBase || "https://www.apargoinnovations.com"
  const robots = seo.robots || "index, follow"

  const metadata: Metadata = {
    title: {
      default: title,
      template: seo.titleTemplate || `%s | ${title}`,
    },
    description,
    keywords: keywords ? keywords.split(",").map((k: string) => k.trim()) : [],
    robots,
    metadataBase: new URL(canonicalBase),
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" }
      ],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
    openGraph: {
      title,
      description,
      siteName: ogSiteName,
      type: (seo.ogType as any) || "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: twitterCard as any,
      title,
      description,
      images: ogImage ? [ogImage] : [],
      ...(seo.twitterSite ? { site: seo.twitterSite } : {}),
      ...(seo.twitterCreator ? { creator: seo.twitterCreator } : {}),
    },
    verification: {
      google: seo.googleVerification || "hjMQc91aAGmuKrqIlvE-JHvdsFl-QPTIVHDUuwGa-f4",
      ...(seo.bingVerification ? { other: { "msvalidate.01": seo.bingVerification } } : {}),
    },
  }

  return metadata
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = await getSiteSection<any>('seo')
  const title = seo.siteTitle || "Apargo"
  const canonicalBase = seo.canonicalBase || "https://www.apargoinnovations.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apargo Innovations",
    "url": canonicalBase,
    "logo": `${canonicalBase}/group-2.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "email": "hello@apargo.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/apargoinnovations",
      "https://twitter.com/apargo"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "url": canonicalBase,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${canonicalBase}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <TooltipProvider>{children}</TooltipProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KMP1EC31Y3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KMP1EC31Y3');
          `}
        </Script>
      </body>
    </html>
  );
}
