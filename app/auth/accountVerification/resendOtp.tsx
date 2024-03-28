"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { resendOTP } from "@/services/auth";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";

const ResendOTP = () => {
  const router = useRouter();
  const pathname = usePathname();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
  });

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const res = await resendOTP({ email: values.email });
      if (res) {
        router.push(`${pathname}?step=2`);
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
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <>
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
                  </div>

                  <Button
                    isLoading={formik.isSubmitting}
                    disabled={!formik.isValid}
                    className={`${"!bg-blue-500"}  !mt-5 !disabled:cursor-not-allowed`}
                  >
                    send OTP
                  </Button>
                </Form>
                <div className="flex items-end justify-end text-primary-100 py-3">
                  <Link href="/auth/login">login</Link>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ResendOTP;
