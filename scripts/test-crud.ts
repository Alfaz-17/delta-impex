import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Load environment variables locally without dotenv dependency
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

async function runTest() {
  console.log("Starting Code-Level CRUD Integration Test...\n");
  
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Database Connected.");

    // 1. CREATE TEST DIVISION (or use existing)
    let division = await Division.findOne({ slug: 'test-division' });
    if (!division) {
      division = await Division.create({
        name: "Test Division",
        slug: "test-division",
        description: "For Testing Purposes"
      });
      console.log("✅ [CREATE] Test Division created:", division._id);
    }

    // 2. CREATE CATEGORY
    const categoryName = `Test Category ${Date.now()}`;
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
    const category = await Category.create({
      name: categoryName,
      slug: categorySlug,
      division: division._id
    });
    console.log(`✅ [CREATE] Category created: ${category.name} (${category._id})`);

    // 3. READ CATEGORY
    const foundCat = await Category.findById(category._id).populate("division");
    if (foundCat && foundCat.division.name === "Test Division") {
      console.log("✅ [READ] Category successfully retrieved and division populated.");
    } else {
      throw new Error("Failed to read category or populate division.");
    }

    // 4. CREATE PRODUCT
    const productName = `Test Product ${Date.now()}`;
    const productSlug = productName.toLowerCase().replace(/ /g, '-');
    const product = await Product.create({
      name: productName,
      slug: productSlug,
      division: division._id,
      category: category._id,
      description: "A test product",
      price: "$100",
      condition: "New",
      imageUrl: "/placeholder.png",
      isFeatured: true
    });
    console.log(`✅ [CREATE] Product created: ${product.name} (${product._id})`);

    // 5. UPDATE PRODUCT
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { price: "$200", condition: "Used" },
      { new: true }
    );
    if (updatedProduct.price === "$200" && updatedProduct.condition === "Used") {
      console.log("✅ [UPDATE] Product successfully updated.");
    } else {
      throw new Error("Failed to update product.");
    }

    // 6. READ PRODUCTS BY DIVISION/CATEGORY
    const productsList = await Product.find({ division: division._id, category: category._id });
    if (productsList.length > 0) {
       console.log(`✅ [READ] Found ${productsList.length} products in test category.`);
    } else {
       throw new Error("Failed to fetch product list by division and category.");
    }

    // 7. DELETE PRODUCT
    await Product.deleteMany({ _id: { $in: [product._id] } });
    const productAfterDelete = await Product.findById(product._id);
    if (!productAfterDelete) {
      console.log("✅ [DELETE] Product successfully deleted.");
    } else {
      throw new Error("Product was not deleted.");
    }

    // 8. DELETE CATEGORY
    await Category.deleteMany({ _id: { $in: [category._id] } });
    const categoryAfterDelete = await Category.findById(category._id);
    if (!categoryAfterDelete) {
      console.log("✅ [DELETE] Category successfully deleted.");
    } else {
      throw new Error("Category was not deleted.");
    }

    console.log("\n🎉 All internal code-level CRUD operations passed successfully!");

  } catch (error) {
    console.error("\n❌ TEST FAILED:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTest();
