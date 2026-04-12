import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDivision extends Document {
  name: string;
  slug: string;
}

const DivisionSchema = new Schema<IDivision>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

const Division: Model<IDivision> = mongoose.models.Division || mongoose.model<IDivision>("Division", DivisionSchema);
export default Division;
