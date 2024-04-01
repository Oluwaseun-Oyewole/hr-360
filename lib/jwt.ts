import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "20m",
};
export const signJwt = (
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) => {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const token = jwt.sign(payload, secretKey!, option);
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
