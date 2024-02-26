import getGlobals from '../../sanity/lib/queries/getGlobals'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'
import ProjectImage from '../components/ProjectImage'

export default async function Home() {
  const globals = await getGlobals()

  const images = globals?.images
  const randomIndex = Math.floor(Math.random() * (images?.length || 0))
  const currentImage = images?.[randomIndex]

  return (
    <div className="grid grid-cols-12">
      <section id="about" className="col-span-full md:col-span-6">
        {globals?.mainText ? (
          <PortableText value={globals?.mainText} components={PortableTextComponents} />
        ) : null}
      </section>
      <section id="projects" className="col-span-full md:col-span-6">
        <div>
          <h2 className="sr-only">Project</h2>
          {currentImage ? <ProjectImage image={currentImage} /> : null}
        </div>
      </section>
    </div>
  )
}
