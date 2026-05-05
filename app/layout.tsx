import type { Metadata } from 'next'
import '../src/styles/globals.css'

export const metadata: Metadata = {
  title: 'Jonathan Thomas | ML Engineer & AI Researcher',
  description:
    'Interactive 3D portfolio showcasing projects, publications, and experience in AI and machine learning.',
  keywords: 'machine learning, AI, research, portfolio, 3D',
  authors: [{ name: 'Jonathan Thomas' }],
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
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="h-full overflow-x-hidden bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  )
}
