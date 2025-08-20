"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect } from "@/routes";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
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

  const handleSubmit = async (values: Record<string, any>) => {
            router.replace(login_redirect);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.status === 200) {
        router.replace(login_redirect);
      }
      Toastify.error(res?.error as string);
    } catch (error) {
      Toastify.error("Something went wrong");
    }
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
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
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
