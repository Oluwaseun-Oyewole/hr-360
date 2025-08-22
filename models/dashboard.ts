import { IStatus } from "@/services/auth/types";
import mongoose, { Model, Schema } from "mongoose";
import { IEmploymentType, IRoleType } from "./users";

export interface DashboardInterface extends Document {
  date: Date;
  employeeName: string;
  role: IRoleType;
  employmentType: IEmploymentType;
  status: IStatus;
  checkIn: Date;
  checkOut: Date;
  overTime?: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const DashboardSchema = new Schema<DashboardInterface>(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    employeeName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(IRoleType),
      default: IRoleType.Default,
    },
    employmentType: {
      type: String,
      enum: Object.values(IEmploymentType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(IStatus),
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    overTime: {
      type: Number,
      required: false,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
  },
  {
    timestamps: true,
  }
);

let DashboardModelInstance: Model<DashboardInterface>;

try {
  DashboardModelInstance = mongoose.model<DashboardInterface>("Dashboard");
} catch (error) {
  DashboardModelInstance = mongoose.model<DashboardInterface>(
    "Dashboard",
    DashboardSchema
  );
}

export const DashboardModel = DashboardModelInstance;
