import { jwtService } from "./jwt/index";
import { AccessToken } from "./jwt/jwt-service.interface";

export const isAuthenticate = async (token: AccessToken): Promise<boolean> => {
  try {
    if (!token || token === "") {
      return false;
    } else {
      return !!(await jwtService.verify(token));
    }
  } catch (error) {
    return false;
  }
};
