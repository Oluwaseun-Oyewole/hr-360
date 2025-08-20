import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import Loader from "../loader";

type IProps = { isLoading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  isLoading = false,
  ...rest
}: IProps) {
  return (
    <>
      <button
        {...rest}
        className={classNames(
          ` h-[50px] px-[8px] rounded-[5px] bg-btn text-white bg-secondary w-full disabled:opacity-50 disabled:!cursor-not-allowed gap-4 ${
            isLoading && "flex items-center justify-center gap-3 "
          } `,
          className
        )}
      >
        {isLoading && <Loader />} {children}
      </button>
    </>
  );
}
