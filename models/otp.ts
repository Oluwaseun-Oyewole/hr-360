import mongoose, { Schema, models } from "mongoose";

const optSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  otp: {
    type: String,
    required: true,
  },
  hashedOTP: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

export const OTP = models.OTP || mongoose.model("OTP", optSchema);
