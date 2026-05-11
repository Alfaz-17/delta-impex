import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // We should hash this in a real app, but for now I'll check if they use hashing elsewhere
  name?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
