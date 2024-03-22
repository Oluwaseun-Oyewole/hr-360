import { verifyJwt } from "@/lib/jwt";
import { User } from "@/models/users";

type ActivateUserTypeFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivate" | "success">;

export const activateUser: ActivateUserTypeFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);
  const userId = payload?.id;
  const user = await User.findById({ _id: userId });
  if (!user || !userId) return "userNotExist";
  if (user.emailVerified) return "alreadyActivate";
  await User.findOneAndUpdate({ _id: user?.id }, { emailVerified: new Date() });
  return "success";
};
