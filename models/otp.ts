import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOtp extends Document {
  user: mongoose.Types.ObjectId;
  otp: string;
  hashedOTP?: string;
  createdAt: Date;
  expiresAt?: Date;
}

const otpSchema = new Schema<IOtp>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

// Function to get or create the model
function getOtpModel(): Model<IOtp> {
  if (mongoose.models.OTP) {
    return mongoose.models.OTP as Model<IOtp>;
  }
  return mongoose.model<IOtp>("OTP", otpSchema);
}

export const OTP = getOtpModel();
