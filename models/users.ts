import mongoose, { Schema, models } from "mongoose";

enum IEmploymentType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Contract = "Contract",
}

enum IRoleType {
  HrManager = "HR Manager",
  Software = "Software Engineer",
  Marketing = "Marketing Ex",
  FinancialAnalyst = "Financial Analyst",
  ProjectManager = "Project MAnager",
  Designer = "Designer",
  SocialMedia = "Social Media Manager",
  Accountant = "Accountant",
  BusinessAnalyst = "Business analyst",
  SalesRep = "Sales representative",
  CustomerService = "Customer service ",
  AdministrativeAssistant = "Administrative assistant",
  Default = "",
}

export interface IUser extends Document {
  name: string;
  email: string;
  role: IRoleType;
  emailVerified: Date;
  password: string;
  employmentType: IEmploymentType;
  isUpdated: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      // for other services like OAuth services with google, github e.t.c
      required: false,
    },

    role: {
      type: String,
      enum: IRoleType,
      default: IRoleType.Default,
    },
    employmentType: {
      type: String,
      enum: IEmploymentType,
    },
    emailVerified: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", userSchema);
