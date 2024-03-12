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
      description: 'Site title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'SEO / OpenGraph description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'SEO / OpenGraph image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      description:
        'Select images to display in the project-gallery. Add descriptions directy to the images in the "Media"-section in the top menu.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
          icon: () => '🖼️',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'menu',
      title: 'Menu Sections',
      type: 'array',
      description: 'Displayed in the menu',
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          icon: () => '🖋️',
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
