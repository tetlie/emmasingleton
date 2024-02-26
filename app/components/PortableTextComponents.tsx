import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { getImageDimensions } from '@sanity/asset-utils'

// Barebones lazy-loaded image component
const ImageComponent = ({ value }: any) => {
  console.log(value)
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
      <ul className="ml-5 text-lg leading-snug list-disc lg:mt-10 md:text-xl lg:text-2xl">
        {children}
      </ul>
    ),
    number: ({ children }: any | undefined) => <ol className="list-decimal mt-lg">{children}</ol>,
  },
  block: {
    // h1: ({ children }: any | undefined) => <h1 className="py-10 text-5xl font-bold">{children}</h1>,
    normal: ({ children }: any | undefined) => (
      <p className="mt-5 text-lg leading-snug lg:mt-10 md:text-xl lg:text-2xl">{children}</p>
    ),
    h2: ({ children }: any | undefined) => (
      <h2 className="mt-5 tracking-tight font-normal leading-[0.96em] text-black text-3xl md:text-4xl lg:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any | undefined) => (
      <h3 className="mt-5 tracking-tight font-normal leading-[0.96em] text-black text-2xl md:text-3xl lg:text-4xl">
        {children}
      </h3>
    ),
    h4: ({ children }: any | undefined) => (
      <h4 className="mt-5 tracking-tight font-normal leading-[0.96em] text-black text-xl md:text-2xl lg:text-3xl">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any | undefined) => (
      <blockquote className="py-5 pl-5 mt-5 text-lg leading-snug border-l-2 border-l-black lg:mt-10 md:text-xl lg:text-2xl">
        {children}
      </blockquote>
    ),
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
