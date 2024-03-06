import getGlobals from '../../sanity/lib/queries/getGlobals'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'
import ProjectImages from '../components/ProjectImages'
import DrawingBoard from '../components/Canvas'

export default async function Home() {
  const globals = await getGlobals()

  const images = globals?.images
  const randomIndex = Math.floor(Math.random() * (images?.length || 0))
  const currentImage = images?.[randomIndex]

  return (
    <div className="h-full w-full flex flex-grow">
      {/* <section id="about" className="p-4 lg:pr-0 md:py-8 md:pl-8 lg:pl-20 col-span-full lg:col-span-6">
        {globals?.mainText ? (
          <PortableText value={globals?.mainText} components={PortableTextComponents} />
        ) : null}
      </section> */}
      <section id="projects" className="h-full w-full lg:w-1/2 relative col-span-full lg:col-span-6">
          <h2 className="sr-only">Project</h2>
          {currentImage ? <ProjectImages images={images} cover  /> : null}
      </section>
      <section id="drawing-board" className="hidden lg:block h-full w-1/2 relative col-span-full lg:col-span-6">
        <DrawingBoard />
      </section>
      {/* <section id="projects-dup" className="hidden lg:block h-full w-1/2 relative col-span-full lg:col-span-6">
          <h2 className="sr-only">Project</h2>
          {currentImage ? <ProjectImages images={images} cover  /> : null}
      </section> */}
    </div>
  )
}
