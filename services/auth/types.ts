export interface LoginRequestBody {
  email: string;
  password: string;
  redirect: boolean;
}
export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
  employmentType: string;
}

export interface AuthResponseBody {
  data: { message: string; status: number };
}

export interface PasswordResetRequestBody {
  jwtUserId: string;
  password: string;
  confirm_password: string;
}
export interface ForgotPasswordRequestBody {
  email: string;
}

export interface changeEmailRequestBody {
  name: string;
  email: string;
  updateEmail: string;
}

export interface updateAccountRequestBody {
  email: string;
  name: string;
  role: string;
  employmentType: string;
}

export interface resendOTPRequestBody {
  email?: string;
}

export interface verifyOTPRequestBody {
  email?: string;
  otpCode: string;
}

export enum IEmploymentType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Contract = "Contract",
}

export enum IStatus {
  present = "Present",
  absent = "Absent",
  late = "Late",
}

export enum IRoleType {
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

export interface AddEmployeeInterface {
  date?: Date;
  employeeName: string;
  role: IRoleType | null;
  employmentType: IEmploymentType | null;
  status: IStatus | null;
  checkIn: Date | null;
  checkOut: Date | null;
  overTime?: null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
