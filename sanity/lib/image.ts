import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image): string | null => {
  if (!source) {
    return null
  }
  return imageBuilder?.image(source).auto('format').fit('max').dpr(3).quality(90).url()
}
