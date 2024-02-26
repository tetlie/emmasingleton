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
  title: string
  description?: string
  image?: Image
  mainText?: PortableTextBlock[]
  images?: Image[]
  menu?: { menuSection: PortableTextBlock[] }[]
  seo?: SEO
}
