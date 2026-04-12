/**
 * Unified blog post with category-driven Studio UX and conditional fields.
 */

const categories = [
  { title: 'Personal', value: 'personal' },
  { title: 'Books', value: 'books' },
  { title: 'Tech', value: 'tech' },
] as const

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [...categories],
        layout: 'radio',
      },
      initialValue: 'tech',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Image gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', type: 'string', title: 'Caption' }],
        },
      ],
      hidden: ({ parent }: { parent?: { category?: string } }) => parent?.category !== 'personal',
      description: 'Shown for Personal posts — masonry-style layouts on the site.',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      hidden: ({ parent }: { parent?: { category?: string } }) => parent?.category !== 'books',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5).integer(),
      hidden: ({ parent }: { parent?: { category?: string } }) => parent?.category !== 'books',
      description: '1–5 stars for book reviews.',
    },
    {
      name: 'repositoryUrl',
      title: 'Repository URL',
      type: 'url',
      hidden: ({ parent }: { parent?: { category?: string } }) => parent?.category !== 'tech',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare({
      title,
      category,
      media,
    }: {
      title?: string
      category?: string
      media?: unknown
    }) {
      return {
        title: title || 'Untitled',
        subtitle: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
        media: media as never,
      }
    },
  },
}
