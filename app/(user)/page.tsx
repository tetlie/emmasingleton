import getGlobals from '../../sanity/lib/queries/getGlobals'
import Projects from '../components/Projects'

export default async function Home() {
  const globals = await getGlobals()

  return (
    <div className="h-full max-h-full w-full flex flex-grow bg-black">
      <section id="projects" className="h-full w-full flex-grow flex items-center justify-center">
        {globals.projects ? <Projects projects={globals.projects} /> : null}
      </section>
    </div>
  )
}
