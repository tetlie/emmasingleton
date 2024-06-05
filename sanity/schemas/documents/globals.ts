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
  groups: [
    { title: 'Header', name: 'header', default: true },
    { title: 'Projects', name: 'projects' },
    { title: 'Footer', name: 'footer' },
    { title: 'SEO', name: 'seo' },
  ],
  icon: () => '⛓️',
  fields: [
    defineField({
      group: 'seo',
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Displayed in search results and when sharing.',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
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
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Site title, displayed the header',
      group: 'header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menu',
      title: 'Menu Sections',
      type: 'array',
      description: 'Displayed in the menu',
      group: 'header',
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
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      description: 'Projects to display. Edit the order by dragging the items.',
      of: [
        {
          title: 'Project',
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
      group: 'projects',
    }),
    defineField({
      type: 'blockContent',
      name: 'drawingBoardText',
      title: 'Drawing Board Text',
      description: 'Text below the drawing board, when open. Keep it short.',
      group: 'footer',
    }),
  ],
})
