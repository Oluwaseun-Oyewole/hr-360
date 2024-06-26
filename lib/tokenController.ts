import * as jose from "jose";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";

const encodedSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const encode = async (params: JWTEncodeParams): Promise<string> => {
  const signedToken = await new jose.SignJWT(params.token)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecret);
  if (!signedToken) {
    throw new Error("Failed to sign token");
  }

  return signedToken;
};

const decode = async (params: JWTDecodeParams): Promise<JWT | null> => {
  if (!params.token) {
    throw new Error("Failed to verify token");
  }
  let token = params.token;
  if (params.token.startsWith("Bearer")) {
    token = params.token.replace("Bearer ", "");
  }
  try {
    const decoded = await jose.jwtVerify(token, encodedSecret);
    if (!decoded.payload) {
      throw new Error("Failed to verify token");
    }
    return decoded.payload.accessToken as any;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const jwtConfig = {
  encode,
  decode,
};
