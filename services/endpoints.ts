export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export class Endpoints {
  static register = BASE_URL + "register";
  static forgotPassword = BASE_URL + "forgotPassword";
  static resetPassword = BASE_URL + "resetPassword";
  static changeEmail = BASE_URL + "email";
  static updateAccount = BASE_URL + "accountUpdate";
  static verifyOTP = BASE_URL + "verifyOTP";
  static resendOTP = BASE_URL + "resendOTP";
  static employees = BASE_URL + "employees";
  static addEmployee = BASE_URL + "add-employee";
}
