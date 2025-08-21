import { verifyJwt } from "@/lib/jwt";
import PasswordReset from "./reset";

interface IProps {
  params: {
    jwt: string;
  };
}

const ResetPassword = ({ params: { jwt } }: IProps) => {
  const payload = verifyJwt(jwt);

  if (!payload) {
    return (
      <div>
        <h1 className="text-xl font-bold">Oops, Invalid token or URL</h1>
        <p className="pt-1 text-sm">
          Please check your email for the correct link
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <PasswordReset params={{ jwt }} />
    </div>
  );
};

export default ResetPassword;
