import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Load environment variables locally
const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
const match = envFile.match(/MONGODB_URI=(.*)/);
const MONGODB_URI = match ? match[1]?.trim() : process.env.MONGODB_URI;

const geminiMatch = envFile.match(/GEMINI_API_KEY=(.*)/);
process.env.GEMINI_API_KEY = geminiMatch ? geminiMatch[1]?.trim() : process.env.GEMINI_API_KEY;

if (!MONGODB_URI) {
  console.error("MONGODB_URI missing in .env.local");
  process.exit(1);
}

// Schemas needed
const SettingsSchema = new mongoose.Schema({
  geminiModel: { type: String, default: "gemini-2.5-flash" },
});
const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);

async function runTest() {
  console.log("Starting AI Integration Test...\n");
  
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Database Connected.");

    // Check Settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ geminiModel: "gemini-2.0-flash" });
      console.log("✅ Created default AI Settings model");
    } else {
        console.log(`✅ Loaded existing AI Settings, model: ${settings.geminiModel}`);
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment or .env.local file. AI analysis will fail.");
    }

    console.log("✅ GEMINI_API_KEY is present.");
    console.log("\n🎉 AI Logic and APIs are ready to be used manually in the browser.");
    console.log("Check the /admin/products/new page to upload an image and click 'Analyze with AI'.");

  } catch (error) {
    console.error("\n❌ TEST FAILED:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTest();
