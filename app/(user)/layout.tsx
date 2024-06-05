import type { Metadata } from 'next'
import '../globals.css'
import getGlobals from '../../sanity/lib/queries/getGlobals'
import Header from '../components/Header'
import { AppWrapper } from '../components/Context'
import Footer from '../components/Footer'
import CanvasWrapper from '../components/CanvasWrapper'

export async function generateMetadata(): Promise<Metadata> {
  const globals = await getGlobals()

  const title = globals?.seo?.title || globals?.title || 'Emma Singleton'
  const description = globals.seo?.description || 'Portfolio'
  const imageUrl = globals?.seo?.image?.url || ''

  return {
    title,
    description,
    openGraph: {
      images: imageUrl,
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
      <AppWrapper>
        <body className="h-svh relative text-base flex flex-col overflow-hidden md:text-lg font-serif bg-white antialiased">
          <Header globals={globals} />
          <main className="relative flex flex-grow flex-col items-center justify-between">
            {children}
            <CanvasWrapper />
          </main>
          <Footer globals={globals} />
        </body>
      </AppWrapper>
    </html>
  )
}
