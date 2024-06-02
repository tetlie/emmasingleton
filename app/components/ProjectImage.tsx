'use client'

import Image from 'next/image'
import type { SanityImageAssetDocument } from 'next-sanity'

type ImageDisplayProps = {
  asset: SanityImageAssetDocument
  layout: 'cover' | 'contain'
}

const ProjectImage: React.FC<ImageDisplayProps> = ({ asset, layout }) => {
  const {
    metadata: {
      lqip,
      dimensions: { width, height },
    },
    url,
    altText,
  } = asset

  const isCover = layout === 'cover'

  return (
    <figure
      className={`relative w-full overflow-hidden ${
        isCover
          ? 'h-full'
          : 'aspect-square sm:aspect-auto sm:h-full flex items-center justify-center'
      }`}
    >
      <Image
        blurDataURL={lqip}
        placeholder="blur"
        src={url}
        loading="lazy"
        alt={altText || ''}
        quality={95}
        sizes="(max-width: 1023px) 200vw, 200vh"
        className={`z-10 max-w-full ${isCover ? 'object-cover' : 'object-contain'} ${
          !isCover && 'max-w-full'
        }`}
        {...(isCover
          ? { layout: 'fill' }
          : {
              width,
              height,
              style: {
                display: 'block',
                aspectRatio: `${width} / ${height}`,
                maxHeight: '100%',
                maxWidth: '100%',
              },
            })}
      />
    </figure>
  )
}

export default ProjectImage
