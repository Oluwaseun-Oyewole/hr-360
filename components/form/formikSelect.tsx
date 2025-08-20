import type { SelectProps } from "antd";
import { Select } from "antd";
import classNames from "classnames";
import { ErrorMessage } from "formik";
import React from "react";
import FormError from "./form-error";
import FormFieldLayout from "./layout";

type ISelect = {
  label?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
} & SelectProps;

const FormSelect: React.FC<ISelect> = ({
  label,
  name,
  fieldNames,
  placeholder,
  className,
  onChange = () => {},
  onBlur,
  options,
  value,
  ...props
}) => {
  const handleChange = (value: string) => {
    onChange(value ?? "");
  };

  return (
    <FormFieldLayout
      label={label}
      content={
        <>
          <Select
            value={value || undefined}
            allowClear
            showSearch
            className={classNames(className)}
            style={{
              width: "100%",
              height: "50px",
            }}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={onBlur}
            options={options}
            {...props}
          />
          <ErrorMessage
            name={name as any}
            // eslint-disable-next-line react/no-children-prop
            children={(msg) => <FormError error={msg} />}
          />
        </>
      }
    />
  );
};

export default FormSelect;
