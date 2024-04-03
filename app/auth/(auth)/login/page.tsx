"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect } from "@/routes";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    if (window && typeof window !== undefined) {
      router.replace("/auth/login");
    }
  }, []);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/,
        "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
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
      <h1 className="text-center">Log in to your account</h1>
      <div className="w-[80%] lg:w-[40%]">
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
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
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
                  login
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className="flex justify-between items-center">
          <div className="py-2">
            <Link
              href="/auth/forgotPassword"
              className="text-blue-500 cursor-pointer text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="py-2">
            <Link
              href="/auth/accountVerification?step=2"
              className="text-blue-500 cursor-pointer text-sm"
            >
              Activate account
            </Link>
          </div>
        </div>
        <p className="pt-5 text-right text-sm">
          {"Don't have an account? "}
          <Link href="/auth/register" className="text-blue-500 cursor-pointer">
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
