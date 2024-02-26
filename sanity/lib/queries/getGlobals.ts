import { groq } from 'next-sanity'
import { client } from '../client'

import { Globals } from '@/typings'

const query = groq`*[_type == "globals"][0]{
  ...,
  "image": image.asset->{
    ...,
    title,
    url, 
    altText, 
    extension, 
    description
  },
  "images": images[] {
    ...,
    asset->{
      ...,
    }
  }
}`

export default async function getGobals(): Promise<Globals> {
  return client.fetch(query)
}
