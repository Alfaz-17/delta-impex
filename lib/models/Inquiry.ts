import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  type: "product_search" | "general" | "quote";
  searchQuery?: string;
  productName?: string;
  status: "new" | "read" | "responded";
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["product_search", "general", "quote"], 
      default: "general" 
    },
    searchQuery: { type: String },
    productName: { type: String },
    status: { 
      type: String, 
      enum: ["new", "read", "responded"], 
      default: "new" 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
