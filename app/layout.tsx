import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "QUIXIQ Portfolio",
  description: "Modern portfolio website for QUIXIQ. Showcasing modern design, clean code, and web development excellence.",
  generator: "g0st.com",
  keywords: ["QUIXIQ", "Portfolio", "Web Development", "Frontend Developer", "Modern Design", "Next.js Portfolio"],
  openGraph: {
    title: "QUIXIQ Portfolio",
    description: "Modern portfolio website for QUIXIQ",
    type: "website",
    url: "https://g0st.my.id",
    siteName: "QUIXIQ",
    locale: "en_US",
  },
  metadataBase: new URL("https://g0st.my.id"),
  alternates: {
    canonical: "https://g0st.my.id",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
