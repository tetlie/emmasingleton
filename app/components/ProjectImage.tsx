import Image from 'next/image'
import type { Image as ImageType } from '@/typings'

export default function ProjectImage({ image }: { image: ImageType }) {
  const asset = image?.asset || null
  const { width, height } = asset.metadata.dimensions

  return (
    <figure>
      <Image
        blurDataURL={asset.metadata.blurHash}
        placeholder="blur"
        src={asset.url}
        loading="lazy"
        alt={asset.altText}
        width={width}
        height={height}
        style={{
          // Display alongside text if image appears inside a block text span
          display: 'block',
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
      <figcaption>{asset.description}</figcaption>
    </figure>
  )
}
