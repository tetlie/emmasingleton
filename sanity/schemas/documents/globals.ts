import {
  PortableTextBlock,
  PortableTextChild,
  PortableTextSpan,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export default defineType({
  name: 'globals',
  title: 'Globals',
  type: 'document',
  icon: () => '⛓️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      type: 'blockContent',
      name: 'mainText',
      title: 'Main Text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              type: 'blockContent',
              name: 'content',
              title: 'Content',
            }),
          ],
          preview: {
            select: {
              blocks: 'content',
            },
            prepare(value) {
              const block = (value.blocks || []).find(
                (block: PortableTextBlock) => block._type === 'block'
              )
              return {
                title: block
                  ? block.children
                      .filter((child: PortableTextChild) => child._type === 'span')
                      .map((span: PortableTextSpan) => span.text)
                      .join('')
                  : 'No title',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
