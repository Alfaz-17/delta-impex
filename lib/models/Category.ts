import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  division: mongoose.Types.ObjectId;
  imageUrl?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
  imageUrl: { type: String },
});

CategorySchema.index({ division: 1 });

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
