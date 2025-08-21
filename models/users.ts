import mongoose, { Document, Model, Schema } from "mongoose";
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
  CustomerService = "CustomerService",
  AdministrativeAssistant = "AdministrativeAssistant",
  Default = "",
}

export interface IUser extends Document {
  name: string;
  email: string;
  role: IRoleType;
  emailVerified?: Date;
  password?: string;
  employmentType?: IEmploymentType;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: Object.values(IRoleType),
      default: IRoleType.Default,
    },
    employmentType: {
      type: String,
      enum: Object.values(IEmploymentType),
      required: false,
    },
    emailVerified: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

// Pre middleware
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

// Try-catch model creation
let UserModelInstance: Model<IUser>;
try {
  UserModelInstance = mongoose.model<IUser>("User");
} catch (error) {
  UserModelInstance = mongoose.model<IUser>("User", userSchema);
}

export const User = UserModelInstance;
export { IEmploymentType, IRoleType };
