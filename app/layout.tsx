import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'TrustTally – Smart U.S. Financial Calculators',
    template: '%s | TrustTally'
  },
  description: 'Free mortgage prepayment, 401k retirement, DCA investing and home affordability calculators. No login, no ads, 100% private. Trust your numbers, tally your future.',
  keywords: 'mortgage calculator, retirement calculator, 401k calculator, DCA calculator, home affordability calculator, dividend reinvestment, DRIP, financial calculators, free tools',
  authors: [{ name: 'TrustTally' }],
  creator: 'TrustTally',
  publisher: 'TrustTally',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trusttally.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TrustTally – Smart U.S. Financial Calculators',
    description: 'Free financial calculators for mortgages, retirement & investing. No login, no ads.',
    url: 'https://trusttally.com',
    siteName: 'TrustTally',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TrustTally - Financial Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustTally – Smart U.S. Financial Calculators',
    description: 'Free financial calculators for mortgages, retirement & investing.',
    images: ['/twitter-image.png'],
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
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID', // Add when launching
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`${inter.className} bg-gray-50 pb-16 md:pb-0`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileNav />
        
        {/* Google Analytics - Add ID when launching */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
            gtag('config', 'AW-XXXXXXXXXX');
          `}
        </Script>
        
        {/* Schema.org Organization */}
        <Script id="schema-organization" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TrustTally",
              "url": "https://trusttally.com",
              "logo": "https://trusttally.com/logo.png",
              "sameAs": [
                "https://twitter.com/trusttally",
                "https://www.facebook.com/trusttally"
              ],
              "description": "Free U.S. financial calculators for mortgages, retirement, and investing.",
              "foundingDate": "2026",
              "founder": {
                "@type": "Person",
                "name": "TrustTally Team"
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
