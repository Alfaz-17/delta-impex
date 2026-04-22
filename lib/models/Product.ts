import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  division: mongoose.Types.ObjectId;
  description?: string;
  price?: string;
  condition?: string;
  isFeatured: boolean;
  imageUrl: string;
  images: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
  description: { type: String },
  price: { type: String },
  condition: { type: String },
  isFeatured: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
  images: { type: [String], default: [] },
}, { timestamps: true });

// Optimize lookups for featured products per division
ProductSchema.index({ division: 1, isFeatured: -1 });

// Optimize lookups per category
ProductSchema.index({ category: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
