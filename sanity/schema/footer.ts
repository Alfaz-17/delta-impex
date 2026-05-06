import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2026 Delta Impex. All rights reserved.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform (e.g. Facebook)' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
      initialValue: [
        { platform: 'WhatsApp', url: 'https://wa.me/918866114549' },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Link Label' },
            { name: 'url', type: 'string', title: 'Link URL/Path' },
          ],
        },
      ],
      initialValue: [
        { label: 'Products', url: '/products' },
        { label: 'Services', url: '/services' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ],
    }),
  ],
})
