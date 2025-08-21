"use client";
import Loader from "@/components/loader";
import { routes } from "@/routes";
import { useSendOtpMutation, useVerifyMutation } from "@/services/mutations";
import { COOKIES_KEYS } from "@/utils/constants";
import { saveToStorage } from "@/utils/helper";
import { Toastify } from "@/utils/toasts";
import { GetProps, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

type OTPProps = GetProps<typeof Input.OTP>;
const VerifyEmailComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const { mutate, isPending } = useVerifyMutation();
  const { OtpMutation, isOtpPending } = useSendOtpMutation();
  // const handleSubmit = async (values: Record<string, any>) => {
  //   return mutate(
  //     { otpCode: values.otp },
  //     {
  //       onSuccess: (data) => {
  //         if (data) {
  //           handleSuccessToast(data?.message);
  //           saveToStorage(COOKIES_KEYS.TOKEN, data?.token);
  //           router.replace(routes.dashboard);
  //         }
  //       },
  //     }
  //   );
  // };

  const onChange: OTPProps["onChange"] = (text) => {
    if (text?.length === 6) {
      return mutate(
        { email: email, otpCode: text },
        {
          onSuccess: (data) => {
            if (data) {
              Toastify.success(data?.message);
              saveToStorage(COOKIES_KEYS.TOKEN, data?.token);
              router.replace(routes.login);
            }
          },
        }
      );
    }
  };

  const onOtpResend = () => {
    return OtpMutation(
      { email },
      {
        onSuccess: (data) => {
          if (data) {
            Toastify.success(data?.message);
          }
        },
      }
    );
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1>Verify your account</h1>
      <p className="text-sm">Enter the otp sent to your email address</p>
      <div className="w-[80%] md:w-[60%] lg:w-[40%] pt-6 flex flex-col items-center">
        {/* <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <>
                <Form>
                  <div className="items-center justify-center flex">
                    <Input.OTP
                      length={6}
                      separator={(i) => <span>—</span>}
                      {...sharedProps}
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <FormikController
                      control="input"
                      label=""
                      type="text"
                      placeholder="otp"
                      name="otp"
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.otp && formik.touched.otp}
                    />
                  </div>
                  <div className="flex items-center justify-end text-primary-100 py-2">
                    <div
                      role="button"
                      tabIndex={0}
                      className="text-sm"
                      onClick={() => OtpMutation()}
                    >
                      Resend OTP
                    </div>{" "}
                  </div>
                  <Button
                    isLoading={formik.isSubmitting || isPending || isOtpPending}
                    disabled={!formik.isValid || isPending || isOtpPending}
                    className={`!bg-blue-500  !mt-5 !disabled:cursor-not-allowed`}
                  >
                    verify
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik> */}

        <Input.OTP
          length={6}
          separator={(i) => <span>—</span>}
          disabled={isPending || isOtpPending}
          {...sharedProps}
        />

        <div className="flex items-center justify-end text-primary-100 py-4">
          <div
            role="button"
            tabIndex={0}
            className="text-sm"
            onClick={onOtpResend}
          >
            {isOtpPending ? <Loader /> : "Resend OTP"}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailComponent;
