"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { routes } from "@/routes";
import { useSendOtpMutation, useVerifyMutation } from "@/services/mutations";
import { COOKIES_KEYS } from "@/utils/constants";
import { saveToStorage } from "@/utils/helper";
import { handleSuccessToast } from "@/utils/success";
import { GetProps, Input } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

type OTPProps = GetProps<typeof Input.OTP>;

const VerifyEmail = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    otp: Yup.number().required("Otp is required"),
  });
  const { mutate, isPending } = useVerifyMutation();
  const { OtpMutation, isOtpPending } = useSendOtpMutation();
  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      { email: values.email, otpCode: values.otp },
      {
        onSuccess: (data) => {
          if (data) {
            handleSuccessToast(data?.message);
            saveToStorage(COOKIES_KEYS.TOKEN, data?.token);
            router.replace(routes.dashboard);
          }
        },
      }
    );
  };

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
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1>Verify your account</h1>
      <p className="text-sm">Enter the otp sent to your email address</p>
      <div className="w-[80%] md:w-[60%] lg:w-[40%]">
        <Formik
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
                  {/* <div className="items-center justify-center flex">
                    <OTPInput />
                    <Input.OTP
                      length={6}
                      separator={(i) => <span>—</span>}
                      {...sharedProps}
                    />
                  </div> */}

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
        </Formik>
      </div>
    </div>
  );
};

export default VerifyEmail;
