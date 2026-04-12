import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Load environment variables locally
const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
const match = envFile.match(/MONGODB_URI=(.*)/);
const MONGODB_URI = match ? match[1]?.trim() : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI missing in .env.local");
  process.exit(1);
}

// Schemas
const DivisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: String,
  price: String,
  condition: String,
  imageUrl: String,
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Division = mongoose.models.Division || mongoose.model("Division", DivisionSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedData = async () => {
  console.log("🌱 Starting database seeding...");
  
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Database Connected.");

    // Clear existing products and categories
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("🧹 Cleared existing Products and Categories.");

    // Ensure divisions exist
    let marineDivision = await Division.findOne({ slug: "marine-industrial" });
    if (!marineDivision) {
      marineDivision = await Division.create({ name: "Marine & Industrial Parts", slug: "marine-industrial" });
    }
    
    let roDivision = await Division.findOne({ slug: "ro-water-treatment" });
    if (!roDivision) {
      roDivision = await Division.create({ name: "RO Water Treatment", slug: "ro-water-treatment" });
    }

    console.log("✅ Divisions validated.");

    // ---- MARINE CATEGORIES ----
    const marineCategoriesData = [
      { name: "Main Engine Components", slug: "main-engine-components", division: marineDivision._id },
      { name: "Auxiliary Machinery", slug: "auxiliary-machinery", division: marineDivision._id },
      { name: "Pumps & Valves", slug: "pumps-valves", division: marineDivision._id },
      { name: "Navigational Equipment", slug: "navigational-equipment", division: marineDivision._id },
    ];
    const marineCategories = await Category.insertMany(marineCategoriesData);
    const getCat = (name: string) => marineCategories.find(c => c.name === name)?._id;

    // ---- RO CATEGORIES ----
    const roCategoriesData = [
      { name: "High Pressure Pumps", slug: "high-pressure-pumps", division: roDivision._id },
      { name: "Reverse Osmosis Membranes", slug: "ro-membranes", division: roDivision._id },
      { name: "Filtration Systems", slug: "filtration-systems", division: roDivision._id },
      { name: "Control Panels & Sensors", slug: "control-panels", division: roDivision._id },
    ];
    const roCategories = await Category.insertMany(roCategoriesData);
    const getRoCat = (name: string) => roCategories.find(c => c.name === name)?._id;

    console.log(`✅ Created ${marineCategories.length + roCategories.length} Categories.`);

    // ---- PRODUCTS ----
    const productsData = [
      // Marine Products
      {
        name: "Wärtsilä 32 Main Engine Piston Rings",
        slug: toSlug("Wärtsilä 32 Main Engine Piston Rings"),
        division: marineDivision._id,
        category: getCat("Main Engine Components"),
        description: "High-grade OEM replacement piston rings designed for optimal sealing and durability under extreme pressure. Certified for Wärtsilä 32 series.",
        price: "$450 / set",
        condition: "New OEM",
        imageUrl: "/images/marine-parts-clean.png",
        isFeatured: true
      },
      {
        name: "Alfa Laval Purifier Bowl Assembly",
        slug: toSlug("Alfa Laval Purifier Bowl Assembly"),
        division: marineDivision._id,
        category: getCat("Auxiliary Machinery"),
        description: "Complete refurbished bowl assembly for Alfa Laval series separators. Dynamically balanced and tested to factory specifications.",
        price: "$2,800",
        condition: "Reconditioned",
        imageUrl: "/images/mood/hero-marine-detail.png",
        isFeatured: true
      },
      {
        name: "Desmi NSL Centrifugal Pump",
        slug: toSlug("Desmi NSL Centrifugal Pump"),
        division: marineDivision._id,
        category: getCat("Pumps & Valves"),
        description: "Vertical in-line centrifugal pump designed for cooling water, HVAC, and general industrial applications.",
        price: "$1,200",
        condition: "New",
        imageUrl: "/images/marine-1.jpeg",
        isFeatured: false
      },
      {
        name: "Furuno FAR-2xx8 Navigational Radar",
        slug: toSlug("Furuno FAR-2xx8 Navigational Radar"),
        division: marineDivision._id,
        category: getCat("Navigational Equipment"),
        description: "Advanced X-band radar system offering superior target tracking and environmental unclutter functions.",
        price: "Contact for Quote",
        condition: "New",
        imageUrl: "/images/mood/hero-marine-sunset.png",
        isFeatured: false
      },

      // RO Products
      {
        name: "Danfoss APP 30 High-Pressure Pump",
        slug: toSlug("Danfoss APP 30 High-Pressure Pump"),
        division: roDivision._id,
        category: getRoCat("High Pressure Pumps"),
        description: "Energy-efficient axial piston pump designed specifically for SWRO (Seawater Reverse Osmosis) applications requiring high durability.",
        price: "$4,200",
        condition: "New",
        imageUrl: "/ro/ro-pump-clean.png",
        isFeatured: true
      },
      {
        name: "Dow Filmtec SW30HRLE-400 Membrane",
        slug: toSlug("Dow Filmtec SW30HRLE-400 Membrane"),
        division: roDivision._id,
        category: getRoCat("Reverse Osmosis Membranes"),
        description: "High-rejection seawater membrane element yielding maximum fresh water production while maintaining industry-leading salt rejection.",
        price: "$850",
        condition: "New",
        imageUrl: "/ro/ro-membrane-clean.png",
        isFeatured: true
      },
      {
        name: "Industrial Multimedia Filter Tank",
        slug: toSlug("Industrial Multimedia Filter Tank"),
        division: roDivision._id,
        category: getRoCat("Filtration Systems"),
        description: "FRP multi-media filtration tank capable of handling high flow rates for industrial pre-treatment phases.",
        price: "$1,500",
        condition: "New",
        imageUrl: "/ro/ro-plant-clean.png",
        isFeatured: false
      },
      {
        name: "Siemens PLC Control Panel for SWRO",
        slug: toSlug("Siemens PLC Control Panel for SWRO"),
        division: roDivision._id,
        category: getRoCat("Control Panels & Sensors"),
        description: "Fully assembled automation panel with HMI touch interface, designed for automated monitoring of RO salinity and pressure parameters.",
        price: "Contact for Quote",
        condition: "New",
        imageUrl: "/images/mood/hero-industrial-scale.png",
        isFeatured: false
      }
    ];

    await Product.insertMany(productsData);
    console.log(`✅ Created ${productsData.length} Seed Products.`);

    console.log("\n🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ SEEDING FAILED:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedData();
