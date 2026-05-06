import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About DELTA Impex',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      initialValue: 'Proven Excellence',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Marine & Industrial Machinery Spare Parts Solutions',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      initialValue: 'Delta Impex is a India-based company. We provide parts and machinery for ships and land-based industries.',
    }),
    
    // --- Legacy Section ---
    defineField({
      name: 'legacyLabel',
      title: 'Legacy Label',
      type: 'string',
      initialValue: 'Our Legacy',
    }),
    defineField({
      name: 'legacyTitle',
      title: 'Legacy Title',
      type: 'string',
      initialValue: 'Carrying the Legacy Forward',
    }),
    defineField({
      name: 'legacyDescription2',
      title: 'Legacy Secondary Description',
      type: 'text',
      initialValue: 'With our experience and wide network, we help ship owners and industrial clients get reliable parts at the best prices.',
    }),
    defineField({
      name: 'legacyDescription3',
      title: 'Legacy Tertiary Description',
      type: 'text',
      initialValue: 'We are committed to delivering quality products and fast service to build long-term relationships with our clients.',
    }),
    defineField({
      name: 'experienceYears',
      title: 'Experience Years',
      type: 'string',
      initialValue: '20',
    }),
    defineField({
      name: 'experienceLabel',
      title: 'Experience Label',
      type: 'string',
      initialValue: 'Years of Mastery',
    }),
    defineField({
      name: 'experienceBadge',
      title: 'Experience Badge Text',
      type: 'string',
      initialValue: 'Industry Leader',
    }),

    // --- Why Choose Us (Values) ---
    defineField({
      name: 'valuesLabel',
      title: 'Values Label',
      type: 'string',
      initialValue: 'Core Capabilities',
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Values Title',
      type: 'string',
      initialValue: 'Why Choose Delta Impex',
    }),
    defineField({
      name: 'values',
      title: 'Why Choose Us Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
          ],
        },
      ],
      initialValue: [
        { title: "Tested & Verified", description: "Every spare part is thoroughly checked to ensure it works perfectly before we ship it to you." },
        { title: "Worldwide Shipping", description: "We deliver products quickly to ports and factories all over the world." },
        { title: "Expert Knowledge", description: "Our team has years of experience with marine engines, machinery, and water treatment systems." },
        { title: "Fast Delivery", description: "We focus on quick turnarounds so your ship or factory can keep running without delays." },
      ],
    }),

    // --- Portfolio Section ---
    defineField({
      name: 'portfolioLabel',
      title: 'Portfolio Label',
      type: 'string',
      initialValue: 'Our Portfolio',
    }),
    defineField({
      name: 'portfolioTitle',
      title: 'Portfolio Title',
      type: 'string',
      initialValue: 'Our Products & Services',
    }),
    defineField({
      name: 'portfolioMarineTitle',
      title: 'Portfolio Marine Title',
      type: 'string',
      initialValue: 'Marine & Ship Spare Parts',
    }),
    defineField({
      name: 'portfolioMarineDesc',
      title: 'Portfolio Marine Description',
      type: 'text',
      initialValue: 'We supply all types of ship spare parts for main and auxiliary machinery, including:',
    }),
    defineField({
      name: 'portfolioMarineItems',
      title: 'Portfolio Marine Items',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        "Main engine & auxiliary engine spares",
        "Turbochargers, pumps & compressors",
        "Purifiers & separators",
        "Heat exchangers & coolers",
        "Electrical & navigation equipment",
        "Deck & engine room machinery",
        "All types of marine consumables"
      ],
    }),
    defineField({
      name: 'portfolioIndustrialTitle',
      title: 'Portfolio Industrial Title',
      type: 'string',
      initialValue: 'Industrial Solutions',
    }),
    defineField({
      name: 'portfolioIndustrialItems',
      title: 'Portfolio Industrial Items',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        "Industrial engines",
        "Generator sets (gensets)",
        "Machinery spare parts",
        "Industrial equipment"
      ],
    }),
    defineField({
      name: 'portfolioPowerTitle',
      title: 'Portfolio Power Title',
      type: 'string',
      initialValue: 'Power Plant Supply',
    }),
    defineField({
      name: 'portfolioPowerDesc',
      title: 'Portfolio Power Description',
      type: 'text',
      initialValue: 'Power plant equipment, engines, generators, and ongoing spare parts support.',
    }),
    defineField({
      name: 'portfolioRoTitle',
      title: 'Portfolio RO Title',
      type: 'string',
      initialValue: 'RO Water Systems',
    }),
    defineField({
      name: 'portfolioRoDesc',
      title: 'Portfolio RO Description',
      type: 'text',
      initialValue: 'Reverse osmosis plants, water treatment equipment, and maintenance support.',
    }),

    // --- Expertise Section ---
    defineField({
      name: 'expertiseLabel',
      title: 'Expertise Label',
      type: 'string',
      initialValue: 'Technical Expertise',
    }),
    defineField({
      name: 'expertiseTitle',
      title: 'Expertise Title',
      type: 'string',
      initialValue: 'Engine & Machinery Experience',
    }),
    defineField({
      name: 'expertiseDescription',
      title: 'Expertise Description',
      type: 'text',
      initialValue: 'Specialized knowledge in low-speed and medium-speed marine engines, assisting routine maintenance and urgent breakdowns.',
    }),
    defineField({
      name: 'expertise',
      title: 'Technical Expertise',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'items', type: 'array', of: [{ type: 'string' }] },
            { name: 'footerText', type: 'text' },
          ],
        },
      ],
      initialValue: [
        { 
          title: "MAN B&W / Sulzer Engines", 
          items: ["S50MC, S60MC, S70MC series", "Specialized Cylinder Components", "Fuel Pumps & Injection Systems"],
          footerText: "Supplying cylinder liners, pistons, fuel system parts, bearings, and valves for global ship managers."
        },
        { 
          title: "Auxiliary & Processing", 
          items: ["Air Compressors & Starter Motors", "Fresh Water Generators & RO Plants", "Oil Purifiers & Separation Systems"],
          footerText: "Ensuring technical accuracy and proper documentation for uninterrupted onboard operations."
        },
      ],
    }),

    // --- Team Section ---
    defineField({
      name: 'teamLabel',
      title: 'Team Label',
      type: 'string',
      initialValue: 'Our Leadership',
    }),
    defineField({
      name: 'teamTitle',
      title: 'Team Title',
      type: 'string',
      initialValue: 'The Minds Behind Delta Impex',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    }),

    // --- Promise Section ---
    defineField({
      name: 'promiseLabel',
      title: 'Promise Label',
      type: 'string',
      initialValue: 'Our Promise',
    }),
    defineField({
      name: 'promiseTitle',
      title: 'Promise Title',
      type: 'string',
      initialValue: 'Quality Without \nCompromise',
    }),
    defineField({
      name: 'promiseDesc',
      title: 'Promise Description',
      type: 'text',
      initialValue: 'Across all machinery categories, one principle remains constant: we do not compromise on quality or technical accuracy.',
    }),
    defineField({
      name: 'promiseNote',
      title: 'Promise Note',
      type: 'text',
      initialValue: 'Every component is stocked after complete inspection and N.D. Test. We promise honest communication, fair prices, and reliable parts so you never have to worry about quality or delays.',
    }),
    defineField({
      name: 'promiseDetails',
      title: 'Promise Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'desc', type: 'string' },
          ],
        },
      ],
      initialValue: [
        { label: "New OEM Surplus", desc: "Genuine parts from recycled ship stores." },
        { label: "Reconditioned", desc: "Tested on bench with full reports." },
        { label: "Ready Stock", desc: "Immediate delivery for urgent breakdowns." },
      ],
    }),
  ],
})
