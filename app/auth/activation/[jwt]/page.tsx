import { activateUser } from "@/app/api/register/route";
import Button from "@/components/button";
import Link from "next/link";

interface IProps {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params: { jwt } }: IProps) => {
  const result = await activateUser(jwt);
  return (
    <div className="flex h-screen items-center justify-center">
      {result === "userNotExist" ? (
        <p className="text-red-500">User does not exist</p>
      ) : result === "alreadyActivate" ? (
        <div>
          <p className="text-red-500">User already activated</p>
          <Button className="!bg-primary-100 !w-[300px] !mt-4">
            <Link href="/auth/login"> Back to login</Link>
          </Button>
        </div>
      ) : result === "success" ? (
        <div>
          <p>Success! The user is now activated</p>
          <Button className="!bg-primary-100 !w-[300px] !mt-4">
            <Link href="/auth/login"> Back to login</Link>
          </Button>
        </div>
      ) : (
        <p>Oops!!, something went wrong</p>
      )}
    </div>
  );
};

export default ActivationPage;
