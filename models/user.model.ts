import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  otp: number;
  resendOtp: Date;
}

const schema = new mongoose.Schema(
  {
    email: String,
    otp: { type: Number },
    resendOtp: { type: Date, default: new Date(Date.now() + 60000) },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models?.User || mongoose.model<IUser>("User", schema);
