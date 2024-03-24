export const BASE_URL = process.env.BASE_API_URL + "/api/";

export class Endpoints {
  static register = BASE_URL + "/register";
  static forgotPassword = BASE_URL + "/forgotPassword";
  static resetPassword = BASE_URL + "/resetPassword";
  static changeEmail = BASE_URL + "/email";
  static updateAccount = BASE_URL + "/accountUpdate";
}
