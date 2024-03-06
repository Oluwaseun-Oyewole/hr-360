"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const handleSubmit = async (values: Record<string, any>) => {};

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-screen !font-light">
      <h1 className="text-center">Log in to your account</h1>
      <div className="w-[500px]">
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
              <Form className="w-[500px]">
                <div className="flex flex-col gap-5">
                  <FormikController
                    control="input"
                    label=""
                    type="email"
                    placeholder="test@gmail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-[500px] !py-3"
                  />

                  <FormikController
                    control="input"
                    label=""
                    type="password"
                    placeholder="input password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-[500px] !py-3"
                  />
                </div>

                <Button
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                  className={`${
                    !formik.isValid ? "!bg-red-500" : "!bg-blue-500"
                  }  !mt-5 !disabled:cursor-not-allowed`}
                >
                  login
                </Button>
              </Form>
            );
          }}
        </Formik>

        <p className="pt-4 text-right text-sm">
          Already have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 cursor-pointer">
            register
          </Link>
        </p>

        <div className="mt-4 flex flex-col gap-5">
          <Button className="!bg-white !text-black flex items-center justify-center !border-[2px] !border-gray-200 !text-sm">
            <BsGithub className="text-xl" /> Continue with Github
          </Button>
          <Button className="!text-black flex items-center justify-center !border-[2px] !border-gray-200 !text-sm">
            <FcGoogle className="text-2xl" /> Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
