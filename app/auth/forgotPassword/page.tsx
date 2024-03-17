"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { forgotPassword } from "@/services/auth";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface IProps {
  params: {
    jwt: string;
  };
}

const ForgotPassword = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
  });

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    const response = await forgotPassword({ email: values.email });
    if (response?.statusCode === 200) {
      resetForm();
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Reset Your Password</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
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
                  />
                </div>

                <div className="text-sm py-3">
                  <Link className="text-blue-500 pl-1" href="/auth/login">
                    {"Back to login"}
                  </Link>
                </div>

                <Button
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                  className={`${"!bg-blue-500"} !mt-5 !disabled:cursor-not-allowed`}
                >
                  Reset Password
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
