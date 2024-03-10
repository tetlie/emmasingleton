import getGlobals from '../../sanity/lib/queries/getGlobals'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'
import ProjectImages from '../components/ProjectImages'
import DrawingBoard from '../components/Canvas'

export default async function Home() {
  const globals = await getGlobals()

  const images = globals?.images

  return (
    <div className="h-full max-h-full w-full flex flex-grow">
      <section id="projects" className="lg:w-1/2 lg:relative hidden h-full lg:block">
        <h2 className="sr-only">Project</h2>
        {images ? <ProjectImages images={images} cover /> : null}
      </section>
      <section id="drawing-board" className="lg:border-l lg:w-1/2 w-full relative">
        <DrawingBoard />
      </section>
    </div>
  )
}
