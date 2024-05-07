import getGlobals from '../../sanity/lib/queries/getGlobals'
import ProjectImages from '../components/ProjectImages'

export default async function Home() {
  const globals = await getGlobals()

  const images = globals?.images

  return (
    <div className="h-full max-h-full w-full flex flex-grow bg-black">
      <section id="projects" className="h-full w-full flex-grow flex items-center justify-center">
        {images ? <ProjectImages images={images} cover /> : null}
      </section>
    </div>
  )
}
