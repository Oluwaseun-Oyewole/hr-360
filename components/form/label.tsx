import classNames from "classnames";
import { FC } from "react";

type Props = {
  label?: string;
};

const Label: FC<Props> = ({ label = "" }) => {
  return (
    label && (
      <div
        className={classNames("flex items-center mb-[12px] max-2xl:mb-[8px]")}
      >
        <label
          className={classNames(
            "font-medium text-[18px] max-2xl:text-[14px] block text-black flex-1"
          )}
        >
          {label}
        </label>
      </div>
    )
  );
};

export default Label;
