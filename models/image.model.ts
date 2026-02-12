import mongoose from "mongoose";

export interface IImage extends mongoose.Document {
  asset_id: string;
  secure_url: string;
  public_id: string;
  blur_url: string;
}

const schema = new mongoose.Schema(
  {
    asset_id: String,
    secure_url: String,
    public_id: String,
    blur_url: String
  },
  { timestamps: true }
);

export const ImageModel =
  mongoose.models?.Image || mongoose.model<IImage>("Image", schema);
