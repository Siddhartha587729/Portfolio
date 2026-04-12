/**
 * Shared rich text for blog posts: standard blocks, images, code, spoiler callouts.
 */

export default {
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'codeBlock',
      title: 'Code',
      type: 'object',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          initialValue: 'typescript',
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 12,
        },
      ],
    },
    {
      name: 'spoiler',
      title: 'Spoiler',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Spoiler',
        },
        {
          name: 'text',
          title: 'Hidden text',
          type: 'text',
          rows: 6,
        },
      ],
    },
  ],
}
