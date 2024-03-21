import mongoose, { Model, Schema, models } from "mongoose";

enum IEmploymentType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Contract = "Contract",
}
enum IStatus {
  present = "Present",
  absent = "Absent",
  late = "Late",
}
enum IRoleType {
  HrManager = "HR Manager",
  Software = "Software Engineer",
  Marketing = "Marketing Ex",
  FinancialAnalyst = "Financial Analyst",
  ProjectManager = "Project Manager",
  Designer = "Designer",
  SocialMedia = "Social Media Manager",
  Accountant = "Accountant",
  BusinessAnalyst = "Business analyst",
  SalesRep = "Sales representative",
  CustomerService = "Customer service ",
  AdministrativeAssistant = "Administrative assistant",
  Default = "",
}
export interface DashboardInterface extends Document {
  date: Date;
  employeeName: string;
  role: IRoleType;
  employmentType: IEmploymentType;
  status: IStatus;
  checkIn: number;
  checkOut: number;
  overTime: number;
  email: string;
}

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
      type: Number,
    },
    checkOut: {
      type: Number,
    },
    overTime: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export const DashboardModel: Model<DashboardInterface> =
  models.Dashboard || mongoose.model("Dashboard", DashboardSchema);
