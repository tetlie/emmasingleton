import { groq } from 'next-sanity'
import { client } from '../client'

import { Project } from '@/typings'

const query = groq`*[_type == "project"]{
  ...,
  projectImages[] {
    ...,
    image {
      ...,
      asset->{
        ...,
      }
    }
    
  },

}`

export default async function getProjects(): Promise<Project[]> {
  return client.fetch(query)
}
