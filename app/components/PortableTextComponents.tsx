import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { getImageDimensions } from '@sanity/asset-utils'

// Barebones lazy-loaded image component
const ImageComponent = ({ value }: any) => {
  const { width, height } = getImageDimensions(value)
  return (
    <figure>
      <Image
        src={value.url}
        alt={value.alt}
        loading="lazy"
        width={width}
        height={height}
        style={{
          // Display alongside text if image appears inside a block text span
          display: 'block',
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
      <figcaption>{value.description}</figcaption>
    </figure>
  )
}

export const PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="mt-5">
        <ImageComponent value={value} />
      </div>
    ),
  },
  list: {
    bullet: ({ children }: any | undefined) => (
      <ul className="ml-5 leading-snug list-disc">{children}</ul>
    ),
    number: ({ children }: any | undefined) => <ol className="list-decimal mt-lg">{children}</ol>,
  },
  block: {
    // h1: ({ children }: any | undefined) => <h1 className="py-10 text-5xl font-bold">{children}</h1>,
    normal: ({ children }: any | undefined) => <p className="">{children}</p>,
    h2: ({ children }: any | undefined) => <h2 className="">{children}</h2>,
  },
  marks: {
    link: ({ children, value }: any | undefined) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : ''
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="underline decoration-black hover:decoration-transparent"
        >
          {children}
        </Link>
      )
    },
  },
}
