import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitHub Explorer',
  description: 'Search and explore GitHub repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}