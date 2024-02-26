import type { Metadata } from 'next'
import '../globals.css'
import getGlobals from '../../sanity/lib/queries/getGlobals'

export async function generateMetadata(): Promise<Metadata> {
  const globals = await getGlobals()

  const title = globals?.title || 'ES'
  const description = globals.description || 'ES'
  const imageUrl = globals?.image?.asset?.url || ''

  return {
    title,
    description,
    openGraph: {
      images: [imageUrl],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const globals = await getGlobals()
  return (
    <html lang="en">
      <body className="font-serif relative bg-yellow antialiased">
        <header className="flex items-center justify-between p-24">
          <h1 className="text-4xl font-bold">{globals.title}</h1>
          <button>Info</button>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
      </body>
    </html>
  )
}
