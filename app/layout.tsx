import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'DoganConsult - Gaming Paradise Strategy Arena',
  description: 'Professional business consultation with AI agents and gaming paradise features',
  keywords: 'business consultation, AI agents, strategy arena, gaming paradise',
  authors: [{ name: 'Ahmet Dogan' }],
  robots: 'index, follow',
  openGraph: {
    title: 'DoganConsult - Gaming Paradise Strategy Arena',
    description: 'Professional business consultation with AI agents and gaming paradise features',
    type: 'website',
    url: 'https://www.doganconsult.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/favicon.svg" />
        <meta name="theme-color" content="#0F2C4C" />
        <meta name="gaming-paradise" content="v2.0-enabled" />
        <meta name="magical-level" content="2" />
        <meta name="tenant-domain" content="doganconsult.com" />
        <meta name="agents" content="consult-professional,consult-technical" />
      </head>
      <body className={`${inter.className} bg-background text-white`}>
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-background">
          {children}
        </div>
      </body>
    </html>
  )
}
