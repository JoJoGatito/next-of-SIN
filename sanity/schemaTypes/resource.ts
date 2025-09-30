import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Local Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Community Space', value: 'community-space' },
          { title: 'Mutual Aid', value: 'mutual-aid' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Website/Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Hours of Operation',
      type: 'object',
      fields: [
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'string',
          placeholder: 'e.g., 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          placeholder: 'e.g., 10:00 AM - 3:00 PM',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          placeholder: 'e.g., Closed',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
})