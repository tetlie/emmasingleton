import type { Metadata } from 'next'
import '../globals.css'
import getGlobals from '../../sanity/lib/queries/getGlobals'
import Header from '../components/Header'

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
      <body className="relative text-base flex flex-col h-svh md:text-lg lg:text-xl font-serif  bg-yellow antialiased">
        <Header globals={globals} />
        <main className="mt-[57px] md:mt-[61px] flex flex-grow flex-col items-center justify-between">
          {children}
        </main>
      </body>
    </html>
  )
}
