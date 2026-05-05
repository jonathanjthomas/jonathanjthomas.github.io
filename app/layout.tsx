import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../src/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jonathan Thomas | ML Engineer & AI Researcher',
  description:
    'Interactive 3D portfolio showcasing projects, publications, and experience in AI and machine learning.',
  keywords: 'machine learning, AI, research, portfolio, 3D',
  author: 'Jonathan Thomas',
  openGraph: {
    title: 'Jonathan Thomas | ML Engineer & AI Researcher',
    description:
      'Interactive 3D portfolio showcasing projects, publications, and experience in AI and machine learning.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="h-full overflow-x-hidden bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  )
}
