import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// interface SignOption {
//   expiresIn: string | number;
// }

const DEFAULT_SIGN_OPTION = {
  expiresIn: "20m",
};
export const signJwt = (
  payload: JwtPayload,
  option: SignOptions = DEFAULT_SIGN_OPTION as any
) => {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET as any;
    const token = jwt.sign(payload, secretKey, option);
    return token;
  } catch (error) {
    return null;
  }
};

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const decode = jwt.verify(token, secretKey!);
    return decode as JwtPayload;
  } catch (error) {
    return null;
  }
};

export function verifyJWT(token: string) {
  try {
    return {
      payload: jwt.verify(token, process.env.NEXTAUTH_SECRET!),
      expired: false,
    };
  } catch (error) {
    if ((error as Error).name == "TokenExpiredError") {
      return { payload: jwt.decode(token), expired: true };
    }
    throw error;
  }
}
