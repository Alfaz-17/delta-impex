import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import Division from "../lib/models/Division";
import Category from "../lib/models/Category";
import Product from "../lib/models/Product";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const seedData = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected Successfully.");

    // Clear existing data
    console.log("Clearing existing collections...");
    await Division.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // 1. Create Divisions
    console.log("Creating Divisions...");
    const divisions = await Division.insertMany([
      { name: "Marine Propulsion", slug: "marine-propulsion" },
      { name: "Power Systems", slug: "power-systems" },
      { name: "Industrial Filtration", slug: "industrial-filtration" },
      { name: "Engineering Spares", slug: "engineering-spares" }
    ]);

    const divPropulsion = divisions.find(d => d.slug === "marine-propulsion")!._id;
    const divPower = divisions.find(d => d.slug === "power-systems")!._id;
    const divFiltration = divisions.find(d => d.slug === "industrial-filtration")!._id;
    const divSpares = divisions.find(d => d.slug === "engineering-spares")!._id;

    // 2. Create Categories
    console.log("Creating Categories...");
    const categories = await Category.insertMany([
      { name: "Inboard Engines", slug: "inboard-engines", division: divPropulsion },
      { name: "Outboard Motors", slug: "outboard-motors", division: divPropulsion },
      { name: "Marine Gensets", slug: "marine-gensets", division: divPower },
      { name: "Industrial Generators", slug: "industrial-generators", division: divPower },
      { name: "Fuel Water Separators", slug: "fuel-water-separators", division: divFiltration },
      { name: "Oil Filtration", slug: "oil-filtration", division: divFiltration },
      { name: "Gasket Kits", slug: "gasket-kits", division: divSpares },
      { name: "Turbochargers", slug: "turbochargers", division: divSpares }
    ]);

    const catInboard = categories.find(c => c.slug === "inboard-engines")!._id;
    const catOutboard = categories.find(c => c.slug === "outboard-motors")!._id;
    const catGenset = categories.find(c => c.slug === "marine-gensets")!._id;
    const catSeparator = categories.find(c => c.slug === "fuel-water-separators")!._id;
    const catTurbo = categories.find(c => c.slug === "turbochargers")!._id;

    // 3. Create Products
    console.log("Populating Products...");
    await Product.insertMany([
      {
        name: "Caterpillar 3512C Marine Engine",
        slug: "cat-3512c-marine",
        division: divPropulsion,
        category: catInboard,
        description: "The 3512C marine propulsion engine is available with a wide range of ratings that meet IMO II regulations without any additional aftertreatment. Provide superior power and reliability in a compact envelope.",
        price: "Contact for Quote",
        condition: "New / Zero Hours",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1590400541360-b20340107fd6?q=80&w=1000&auto=format&fit=crop",
        images: [
           "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
           "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        name: "Cummins QSK60-M",
        slug: "cummins-qsk60-m",
        division: divPropulsion,
        category: catInboard,
        description: "V-16 cylinder, 4-stroke diesel engine. Designed for reliability and durability in extreme marine environments.",
        price: "$ 125,000",
        condition: "Reconditioned",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a1cd43a7?q=80&w=1000&auto=format&fit=crop",
        images: []
      },
      {
        name: "Kohler 80EFOZDJ Marine Generator",
        slug: "kohler-80efozdj",
        division: divPower,
        category: catGenset,
        description: "80 kW high-output marine generator set. Features advanced sound shielding and digital controls.",
        price: "$ 48,500",
        condition: "New",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1581092918056-0c8c30060c19?q=80&w=1000&auto=format&fit=crop",
        images: []
      },
      {
        name: "Racor Dual 751000FH Fuel Filter",
        slug: "racor-dual-751000fh",
        division: divFiltration,
        category: catSeparator,
        description: "Duplex turbine series fuel filter water separator. Allows for filter change while engine is running.",
        price: "$ 1,250",
        condition: "Stock Item",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop",
        images: []
      },
      {
        name: "BorgWarner S400 Marine Turbocharger",
        slug: "borgwarner-s400",
        division: divSpares,
        category: catTurbo,
        description: "High-performance replacement turbocharger for medium speed marine diesel engines.",
        price: "$ 3,800",
        condition: "New",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
        images: []
      }
    ]);

    console.log("Database Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
