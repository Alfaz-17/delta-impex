import { GoogleGenAI } from "@google/genai";
import connectToDatabase from "@/lib/mongodb";
import { Settings } from "@/lib/models";

// Use the key from environment
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function analyzeProductImage(imageBuffer: Buffer, mimeType: string, categories: string[] = []) {
  // DIAGNOSTIC LOGS
  console.log("--- AI DIAGNOSTICS ---");
  console.log("MimeType:", mimeType);
  console.log("BufferSize:", imageBuffer.length, "bytes");
  console.log("API Key present:", !!apiKey);
  if (apiKey) {
    console.log("API Key Prefix:", apiKey.substring(0, 7), "...");
  }
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env.local");
  }

  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    
    // Default to gemini-1.5-flash if settings are corrupted or missing
    // gemini-1.5-flash has the highest free tier quota (15 RPM)
    const modelName = settings?.geminiModel || "gemini-1.5-flash";
    console.log("Requested Model:", modelName);

    const categoriesPrompt = categories.length > 0 
      ? `Pick the most appropriate category from this list: ${categories.join(", ")}. If none fit perfectly, pick the closest one.`
      : `Suggest the most appropriate category name for this product (e.g., Marine Engines, Boat Parts, Safety Equipment, etc.)`;

    const prompt = `
      Analyze this product image and provide details for an e-commerce listing.
      Return the information in the following JSON format:
      {
        "title": "A short, descriptive product name",
        "description": "A professional product description (approx. 2-3 lines)",
        "categoryName": "${categoriesPrompt}"
      }
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        { text: prompt },
        {
          inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType: mimeType
          }
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response.");
    }
    
    return JSON.parse(response.text);

  } catch (error: any) {
    console.error("FULL AI ERROR OBJECT:", JSON.stringify(error, null, 2));
    
    // Extracting detailed info from the error
    const status = error.status || error.statusCode || (error.message?.includes("429") ? 429 : 500);
    const message = error.message || "Unknown AI error";

    if (status === 429) {
      throw new Error(`AI limit reached (15 RPM for free tier). Note: Project 'Delta' is using key ${apiKey.substring(0, 6)}... whereas 'Corona' might be using a different key or project with more quota.`);
    }
    
    if (status === 404) {
      throw new Error(`The model '${settings?.geminiModel}' was not found. Please go to Settings and change it to 'gemini-1.5-flash'.`);
    }

    throw new Error(`AI Analysis Error: ${message}`);
  }
}
