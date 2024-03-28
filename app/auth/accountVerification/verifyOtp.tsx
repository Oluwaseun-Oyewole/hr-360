"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect } from "@/routes";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const VerifyOTP = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required")
      .trim(),
    otp: Yup.number()
      .required("Otp is required")
      .min(60000, "Valid OTP should be 6 digits")
      .max(600000, "OTP should not exceed 6 digits"),
  });

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.status === 200) {
        router.replace(login_redirect);
      } else {
        Toastify.error(res?.error as string);
      }
    } catch (error) {
      Toastify.error(error as string);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <div className="w-[80%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
            otp: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-5">
                  <FormikController
                    control="input"
                    label=""
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="!py-3"
                  />

                  <FormikController
                    control="input"
                    label=""
                    type="text"
                    placeholder="Otp"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="!py-3"
                  />
                </div>

                <Button
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                  className={`${"!bg-blue-500"}  !mt-5 !disabled:cursor-not-allowed`}
                >
                  verify
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOTP;
