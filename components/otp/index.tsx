import type { GetProps } from "antd";
import { Input, Typography } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;
const { Title } = Typography;

const OTPInput = () => {
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text?.length);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <Input.OTP length={6} separator={(i) => <span>—</span>} {...sharedProps} />
  );
};

export default OTPInput;
