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
}

//@ts-ignore
const DashboardSchema = new Schema<DashboardInterface>(
  {
    employeeName: { type: String, required: true },
    role: {
      type: String,
      enum: IRoleType,
      default: IRoleType.Default,
    },
    employmentType: {
      type: String,
      enum: IEmploymentType,
    },
    status: {
      type: String,
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
    },
  },
  { timestamps: true }
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
