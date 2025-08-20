import CK from "@/assets/ck.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, InputProps } from "antd";
import classNames from "classnames";
import { ErrorMessage } from "formik";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import FormError from "./form-error";
import FormFieldLayout from "./layout";

type IProps = {
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string | number | null;
  height?: number;
  error?: boolean;
} & InputProps;

export default function FormInput({
  label,
  placeholder,
  value,
  name,
  type = "text",
  onChange,
  onBlur,
  style,
  height = 50,
  error,
  ...props
}: IProps) {
  const { Password } = Input;
  return (
    <FormFieldLayout
      label={label}
      content={
        <>
          {type !== "password" ? (
            <div>
              <Input
                className={classNames(
                  `!rounded-lg border-gray-300 border-[1.3px] focus:border-btn hover:border-btn px-3 placeholder:font-light placeholder:!text-gray-500`,
                  { "!border-red-500": !!error }
                )}
                value={value}
                placeholder={placeholder}
                onChange={onChange && onChange}
                onBlur={onBlur}
                name={name}
                type={type}
                allowClear={type === "search"}
                prefix={type === "search" && <IoSearch />}
                suffix={type === "search" && <Image src={CK} alt="" />}
                style={{ height: `${height}px` }}
                {...props}
              />
              <ErrorMessage name={name as string}>
                {(msg) => <FormError error={msg} />}
              </ErrorMessage>
            </div>
          ) : (
            <div className="relative">
              <Password
                className={classNames(
                  `!rounded-lg border-gray-300 border-[1.3px] focus:border-btn hover:border-btn px-3 placeholder:font-light placeholder:!text-gray-500`,
                  { "!border-red-500": error }
                )}
                value={value}
                placeholder={placeholder}
                onChange={onChange && onChange}
                onBlur={onBlur}
                name={name}
                type="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ height: `${height}px` }}
                {...props}
              />

              <ErrorMessage name={name as string}>
                {(msg) => <FormError error={msg} />}
              </ErrorMessage>
            </div>
          )}
        </>
      }
    />
  );
}
