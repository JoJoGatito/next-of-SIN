import { defineType, defineField } from 'sanity'

export const programGallery = defineType({
  name: 'programGallery',
  title: 'Program Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'programSlug',
      title: 'Program Slug',
      type: 'string',
      options: {
        list: [
          { title: 'Sunstone Youth Group', value: 'sunstone-youth-group' },
          { title: 'Hue House', value: 'hue-house' },
          { title: 'Rock and Stone', value: 'rock-and-stone' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: 'Square', value: 'square' },
                  { title: 'Wide', value: 'wide' },
                  { title: 'Tall', value: 'tall' },
                ],
              },
              initialValue: 'square',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'programSlug',
    },
  },
})