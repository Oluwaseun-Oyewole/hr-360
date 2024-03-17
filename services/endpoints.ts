export const BASE_API_URL = "http://localhost:3000/api";

export class Endpoints {
  static register = BASE_API_URL + "/register";
  static forgotPassword = BASE_API_URL + "/forgotPassword";
  static resetPassword = BASE_API_URL + "/resetPassword";
  static changeEmail = BASE_API_URL + "/email";
  static updateAccount = BASE_API_URL + "/accountUpdate";
}
