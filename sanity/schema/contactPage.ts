import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'Get in touch with our experts for inquiries about marine spares or RO solutions.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'sales@deltaimpex.co',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+91 88661 14549',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      initialValue: 'Office-07, Madina Tenement, Jamnakund Chowk, Bhavnagar - 364001, India',
    }),

    // --- Contact Methods ---
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'primary', type: 'string' },
            { name: 'secondary', type: 'string' },
            { name: 'type', type: 'string', options: { list: ['address', 'phone', 'email', 'globe'] } },
          ],
        },
      ],
      initialValue: [
        { 
          title: 'Global Headquarters', 
          primary: 'Office-07, Madina Tenement', 
          secondary: 'Jamnakund Chowk, Bhavnagar - 364001, India', 
          type: 'address' 
        },
        { 
          title: 'Direct Support', 
          primary: '+91 88661 14549 (IND)', 
          secondary: '+971 52 491 8899 (UAE)', 
          type: 'phone' 
        },
        { 
          title: 'Direct Correspondence', 
          primary: 'anas@deltaimpex.co', 
          secondary: 'Anas Malek (Owner)', 
          type: 'email' 
        },
        { 
          title: 'Service Reach', 
          primary: '150+ Major Ports', 
          secondary: 'Marine & Industrial Supply', 
          type: 'globe' 
        },
      ],
    }),

    // --- Support Features ---
    defineField({
      name: 'supportFeatures',
      title: 'Support Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'desc', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { title: "Quality Check", desc: "Every part is inspected before we send it." },
        { title: "Worldwide Delivery", desc: "We deliver to 150+ major ports around the world." },
        { title: "Fast Response", desc: "We send price quotes within one working day." },
      ],
    }),

    // --- Owner Card ---
    defineField({
      name: 'ownerCardLabel',
      title: 'Owner Card Label',
      type: 'string',
      initialValue: 'Direct Contact',
    }),
    defineField({
      name: 'ownerCardTitle',
      title: 'Owner Card Title',
      type: 'string',
      initialValue: 'Anas Malek',
    }),
    defineField({
      name: 'ownerCardRole',
      title: 'Owner Card Role',
      type: 'string',
      initialValue: 'Managing Director & Owner',
    }),

    // --- Office Redirect ---
    defineField({
      name: 'officeLabel',
      title: 'Office Section Label',
      type: 'string',
      initialValue: 'Head Office',
    }),
    defineField({
      name: 'officeTitle',
      title: 'Office Section Title',
      type: 'string',
      initialValue: 'Bhavnagar Operations',
    }),
  ],
})
