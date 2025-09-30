import { defineType, defineField } from 'sanity'

export const localEvent = defineType({
  name: 'localEvent',
  title: 'Local Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'start',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
      description: 'Complete address including city, state, zip code',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Flyer/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Event flyer or promotional image',
    }),
    defineField({
      name: 'website',
      title: 'Event Website/Social Media',
      type: 'url',
      description: 'Link to event page, Facebook event, or registration',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees (leave empty if unlimited)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
})