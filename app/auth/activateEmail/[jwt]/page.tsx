import { activateUser } from "@/app/api/register/route";

interface IProps {
  params: {
    jwt: string;
  };
}

const ActivateEmail = async ({ params: { jwt } }: IProps) => {
  console.log("jwt", jwt);
  const result = await activateUser(jwt);
  console.log("result result result", result);
  return <div>ActivateEmail</div>;
};

export default ActivateEmail;
