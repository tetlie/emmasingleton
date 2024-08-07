import { SanityImageAssetDocument } from 'next-sanity'
import { PortableTextBlock, SanityDocument } from 'sanity'

export interface SEO {
  title?: string
  description?: string
  image?: Image
}

export interface Image extends SanityImageAssetDocument {
  _type: string
  _key: string
  title: string
  url: string
  altText: string
  description: string
  extension: string
}

export interface Globals extends SanityDocument {
  seo?: SEO
  title: string
  menu?: { _key: string; type: 'section'; content: PortableTextBlock[] }[]
  projects?: Project[]
  drawingBoardText?: PortableTextBlock[]
}

export interface ProjectImage {
  _type: 'projectImage'
  _key: string
  image: Image
  layout: 'cover' | 'contain'
}

export interface Project extends SanityDocument {
  title: string
  text?: PortableTextBlock[]
  projectImages?: ProjectImage[]
}
