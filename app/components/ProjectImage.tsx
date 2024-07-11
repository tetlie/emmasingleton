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
        loading="eager"
        priority
        alt={altText || ''}
        quality={95}
        sizes="(max-width: 1023px) 200vw, 200vh"
        className={`z-10 ${isCover ? 'object-cover' : 'object-cover lg:object-contain'} max-w-full`}
        layout="fill"
        style={{
          display: 'block',
          aspectRatio: !isCover && width && height ? `${width} / ${height}` : undefined,
        }}
      />
    </figure>
  )
}

export default ProjectImage
