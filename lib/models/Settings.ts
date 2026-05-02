import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  autoBackgroundRemoval: boolean;
  applyWatermark: boolean;
  watermarkText: string;
  geminiModel: string;
}

const SettingsSchema = new Schema<ISettings>({
  autoBackgroundRemoval: { type: Boolean, default: false },
  applyWatermark: { type: Boolean, default: true },
  watermarkText: { type: String, default: 'Delta Impex' },
  geminiModel: { type: String, default: "gemini-2.5-flash" },
}, { timestamps: true });

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
export default Settings;
