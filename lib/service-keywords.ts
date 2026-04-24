export type ServiceKeywordPage = {
  slug: string;
  keyword: string;
  title: string;
  intro: string;
  summary: string;
  points: string[];
};

export const SERVICE_KEYWORD_PAGES: ServiceKeywordPage[] = [
  {
    slug: "marine-engine-spare-parts",
    keyword: "marine engine spare parts",
    title: "Marine Engine Spare Parts",
    intro:
      "Delta Impex supplies marine engine spare parts for main and auxiliary engines with global sourcing and inspection-first quality checks.",
    summary:
      "We support shipowners, fleet operators, and technical managers with fast availability for critical marine parts and components.",
    points: [
      "Main engine and auxiliary engine spares",
      "Turbochargers, pumps, purifiers, and separators",
      "New, used, and reconditioned sourcing options",
      "Worldwide dispatch and technical support",
    ],
  },
  {
    slug: "ro-water-treatment-plants",
    keyword: "RO water treatment plants",
    title: "RO Water Treatment Plants",
    intro:
      "Delta Impex delivers RO water treatment plants for marine and industrial applications with dependable desalination performance.",
    summary:
      "Our RO systems help convert seawater and process water into clean usable freshwater in coastal and industrial environments.",
    points: [
      "Reverse osmosis plants and membrane systems",
      "Pre-treatment and post-treatment modules",
      "Industrial and marine-ready configurations",
      "Maintenance support and replacement components",
    ],
  },
  {
    slug: "industrial-machinery-spares",
    keyword: "industrial machinery spares",
    title: "Industrial Machinery Spares",
    intro:
      "Delta Impex provides industrial machinery spares for heavy-duty operations, power systems, and technical infrastructure projects.",
    summary:
      "We source and deliver performance-focused machinery components to reduce downtime and improve reliability.",
    points: [
      "Engine and generator spare components",
      "Industrial pump and filtration assemblies",
      "Requirement-based sourcing and validation",
      "Fast response for urgent procurement",
    ],
  },
  {
    slug: "ship-engine-overhaul-parts",
    keyword: "ship engine overhaul parts",
    title: "Ship Engine Overhaul Parts",
    intro:
      "Delta Impex supplies ship engine overhaul parts for planned maintenance and emergency vessel servicing.",
    summary:
      "Our team helps technical departments source precise overhaul kits and rotating components with quality-focused verification.",
    points: [
      "Overhaul kits, gaskets, and precision internals",
      "Critical rotating and wear components",
      "Compatibility checks by engine model",
      "Reliable export-ready global shipping",
    ],
  },
];

export function getServiceKeywordPage(slug: string) {
  return SERVICE_KEYWORD_PAGES.find((item) => item.slug === slug);
}
