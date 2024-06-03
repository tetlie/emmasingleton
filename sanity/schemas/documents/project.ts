import { defineArrayMember, defineField, defineType } from 'sanity'
import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'blockContent',
      name: 'text',
      title: 'Text',
    }),

    defineField({
      name: 'projectImages',
      title: 'Project Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'projectImage',
          title: 'Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation(rule) {
                return rule.required()
              },
            }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              initialValue: 'cover',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: {
              layout: 'layout',
              media: 'image',
            },
            prepare(selection) {
              const capitalizedLayout =
                selection.layout.charAt(0).toUpperCase() + selection.layout.slice(1)
              return {
                media: selection.media,
                title: 'Layout: ' + capitalizedLayout,
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
      media: 'projectImages[0].projectImage.image',
    },
  },
})
