import mongoose, { Schema, models } from "mongoose";
import { OTP } from "./otp";

enum IEmploymentType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Contract = "Contract",
}

enum IRoleType {
  HrManager = "HrManager",
  SoftwareEngineer = "SoftwareEngineer",
  MarketingEx = "MarketingEx",
  FinancialAnalyst = "FinancialAnalyst",
  ProjectManager = "ProjectManager",
  Designer = "Designer",
  SocialMediaManager = "SocialMediaManager",
  Accountant = "Accountant",
  BusinessAnalyst = "BusinessAnalyst",
  SalesRep = "SalesRep",
  CustomerService = "CustomerService ",
  AdministrativeAssistant = "AdministrativeAssistant",
  Default = "",
}

export interface IUser extends Document {
  name: string;
  email: string;
  role: IRoleType;
  emailVerified: Date;
  password: string;
  employmentType: IEmploymentType;
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

// use middleware for model.cascade

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await OTP.deleteMany({ user: this._id });
      next();
    } catch (error: any) {
      next(error);
    }
  }
);

// Also handle deleteMany operations
userSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (next) {
    try {
      const users = await this.model.find(this.getFilter());
      const userIds = users.map((user) => user._id);
      await OTP.deleteMany({ user: { $in: userIds } });
      next();
    } catch (error: any) {
      next(error);
    }
  }
);

export const User = models.User || mongoose.model("User", userSchema);
