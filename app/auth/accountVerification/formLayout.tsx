import { useSearchParams } from "next/navigation";
import ResendOTP from "./resendOtp";
import VerifyOTP from "./verifyOtp";

const FormContent = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") ?? "";
  const currentStep = Number(step);

  const renderForm = () => {
    if (currentStep === 1) {
      return <ResendOTP />;
    } else if (currentStep === 2) {
      return <VerifyOTP />;
    } else return;
  };
  return <div>{renderForm()} </div>;
};

export default FormContent;
