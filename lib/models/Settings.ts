import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  geminiModel: string;
}

const SettingsSchema = new Schema<ISettings>({
  geminiModel: { type: String, default: "gemini-2.0-flash" },
});

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
export default Settings;
