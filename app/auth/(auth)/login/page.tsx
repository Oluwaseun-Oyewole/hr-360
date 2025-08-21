"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect } from "@/routes";
import { useLoginMutation } from "@/services/mutations";
import { LoginRequestBody } from "@/services/types";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (window && typeof window !== undefined) {
      router.replace("/auth/login");
    }
  }, []);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
    password: Yup.string().required("Password is required"),
  });

  const { mutate, isPending } = useLoginMutation();
  const handleSubmit = async (values: LoginRequestBody) => {
    mutate(
      { ...values },
      {
        onSuccess: (response) => {
          if (response) {
            if (response?.status === 401) {
              Toastify.error("Invalid login credentials");
            } else if (response?.status !== 200)
              Toastify.error(response?.error as string);
            else router.replace(login_redirect);
          }
        },
        onError: (response: any) => {
          Toastify.error(response?.error as string);
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1>Log in to your account</h1>
      <div className="w-[90%] md:w-[60%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
            password: "",
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
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email && formik.touched.email}
                  />

                  <FormikController
                    control="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password && formik.touched.password}
                  />
                </div>

                <Button
                  isLoading={formik.isSubmitting || isPending}
                  disabled={!formik.isValid || isPending}
                  className="!bg-blue-500 !mt-5"
                >
                  login
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className="flex justify-between items-center py-2">
          <Link
            href="/auth/forgotPassword"
            className="text-blue-700 cursor-pointer text-sm"
          >
            Forgot Password?
          </Link>

          <p className="text-right text-sm">
            {"Don't have an account? "}
            <Link
              href="/auth/register"
              className="text-blue-700 cursor-pointer"
            >
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
