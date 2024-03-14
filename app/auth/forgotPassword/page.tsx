"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

interface IProps {
  params: {
    jwt: string;
  };
}

const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
  });

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    try {
      const res: any = await fetch("/api/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
      });
      const data = await res.json();
      if (res.ok) {
        Toastify.success(data?.message);
        resetForm();
      } else {
        Toastify.error(data?.message);
      }
    } catch (error) {
      Toastify.error(error as string);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Reset Your Password</h1>
      <div className="w-[500px]">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form className="w-[500px]">
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
                    className="w-[500px] !py-3"
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
                  className={`${
                    !formik.isValid ? "!bg-red-500" : "!bg-blue-500"
                  }  !mt-5 !disabled:cursor-not-allowed`}
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
