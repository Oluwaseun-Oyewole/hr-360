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
    return <div>Invalid token or URL</div>;
  }
  return (
    <div>
      <PasswordReset params={{ jwt }} />
    </div>
  );
};

export default ResetPassword;
