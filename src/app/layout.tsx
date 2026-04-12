import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { ThemeProvider } from '@/components/providers/theme-provider'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Master Portfolio Hub',
  description: 'A comprehensive portfolio showcasing projects, experience, and skills built with Next.js and Sanity CMS',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
