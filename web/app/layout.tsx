import type { Metadata, Viewport } from "next"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { site } from "../lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Try This — Family games worth passing on",
    template: "%s · Try This"
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.company }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Try This — Family games worth passing on",
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Try This — Family games worth passing on",
    description: site.description
  },
  robots: { index: true, follow: true }
}

export const viewport: Viewport = {
  themeColor: "#315bd9",
  colorScheme: "light"
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
