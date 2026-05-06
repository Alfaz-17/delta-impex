import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Delta Impex - Engineering Excellence',
    }),
    
    // --- Hero Section ---
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'text',
      initialValue: 'Marine & \nIndustrial \nSuppliers',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      initialValue: 'Technically competent supplier for engine parts and machinery.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroCategoryLabel',
      title: 'Hero Categories Label',
      type: 'string',
      initialValue: 'Our Products Categories',
    }),

    // --- Marine Section ---
    defineField({
      name: 'marineTitle',
      title: 'Marine Section Title',
      type: 'string',
      initialValue: 'Marine Engineering.',
    }),
    defineField({
      name: 'marineSubtitle',
      title: 'Marine Section Subtitle',
      type: 'string',
      initialValue: 'Featured Inventory.',
    }),

    // --- About Preview Section ---
    defineField({
      name: 'aboutLabel',
      title: 'About Label',
      type: 'string',
      initialValue: 'The Delta Impex Legacy',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      initialValue: 'Marine Expertise.',
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
      initialValue: 'Industrial Reliability.',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      initialValue: 'Internationally recognized as the most technically competent supplier from India for New, Recondition and Second-hand Engine Parts and Machinery.',
    }),
    defineField({
      name: 'aboutSecondaryText',
      title: 'About Secondary Text',
      type: 'text',
      initialValue: 'Based in Bhavnagar, Gujarat, we have been a cornerstone of the maritime supply chain, specializing in high-quality marine ship spares and critical machinery equipment since 2017.',
    }),
    defineField({
      name: 'aboutExperience',
      title: 'Experience Years',
      type: 'string',
      initialValue: '20',
    }),
    defineField({
      name: 'aboutExperienceLabel',
      title: 'Experience Label',
      type: 'string',
      initialValue: 'Years of Mastery',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Preview Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // --- Water Section ---
    defineField({
      name: 'waterTitle',
      title: 'Water Section Title',
      type: 'string',
      initialValue: 'Water Treatment.',
    }),
    defineField({
      name: 'waterSubtitle',
      title: 'Water Section Subtitle',
      type: 'string',
      initialValue: 'Technical Highlights.',
    }),

    // --- Brands Section ---
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'logo', type: 'image' },
          ],
        },
      ],
    }),

    // --- Technology Section ---
    defineField({
      name: 'techLabel',
      title: 'Tech Section Label',
      type: 'string',
      initialValue: 'Advanced Engineering',
    }),
    defineField({
      name: 'techHeading',
      title: 'Technology Heading',
      type: 'text',
      initialValue: 'RO Water \nDesalination.',
    }),
    defineField({
      name: 'techDescription',
      title: 'Technology Description',
      type: 'text',
      initialValue: 'We supply specialized RO systems for both marine and industrial use, designed to convert saline seawater into clean, safe, and potable freshwater.',
    }),
    defineField({
      name: 'techSecondaryDescription',
      title: 'Technology Secondary Description',
      type: 'text',
      initialValue: 'Our technology plays a vital role in regions where freshwater resources are limited, especially in coastal and industrial areas. We provide complete solutions including Reverse Osmosis plants, water treatment equipment, and specialized maintenance support.',
    }),
    defineField({
      name: 'techBadgeLabel',
      title: 'Tech Badge Label',
      type: 'string',
      initialValue: 'Technical Standard',
    }),
    defineField({
      name: 'techBadgeTitle',
      title: 'Tech Badge Title',
      type: 'string',
      initialValue: 'ISO CERTIFIED',
    }),
    defineField({
      name: 'techItems',
      title: 'Technology Items',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        "Seawater Desalination",
        "Technical Maintenance",
        "Advanced Filtration",
        "Global Supply Chain",
        "Industrial Scale",
        "Marine Specialized"
      ],
    }),

    // --- Product Section Shared Labels ---
    defineField({
      name: 'viewAllText',
      title: 'View All Button Text',
      type: 'string',
      initialValue: 'View Full Directory',
    }),
    defineField({
      name: 'technicalDetailsText',
      title: 'Technical Details Link Text',
      type: 'string',
      initialValue: 'Technical Details',
    }),
    defineField({
      name: 'emptyText',
      title: 'Empty State Text',
      type: 'string',
      initialValue: 'Establishing Catalog Sync...',
    }),

    // --- SEO Section ---
    defineField({
      name: 'seoTitle1',
      title: 'SEO Title 1',
      type: 'string',
      initialValue: 'Global Supplier of Marine Spares & RO Systems',
    }),
    defineField({
      name: 'seoContent1',
      title: 'SEO Content 1',
      type: 'text',
      initialValue: 'Delta Impex is a leading provider of high-quality marine engine parts and industrial RO water treatment solutions. Based in India, we serve ship owners and industrial clients worldwide with technical expertise and reliable supply chains.',
    }),
  ],
})
