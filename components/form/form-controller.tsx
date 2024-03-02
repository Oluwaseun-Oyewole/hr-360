import { FC } from "react";
import FormInput from "./form-input";
import FormSelect from "./form-select";

interface IFormikControlProps {
  control: "input" | "select" | "area";
  [key: string]: any;
}

const FormikController: FC<IFormikControlProps> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <FormInput {...rest} />;
    case "select":
      return <FormSelect {...rest} />;
    default:
      return null;
  }
};

export default FormikController;
