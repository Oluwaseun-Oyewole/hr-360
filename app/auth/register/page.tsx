"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const SignUp = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name Required"),
    email: Yup.string().required("Email Required."),
    password: Yup.string().required("Password Required"),
    role: Yup.string().required("Select Role"),
  });

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {};

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center h-screen !font-light">
      <h1 className="text-center">Registration Form</h1>
      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form className="!w-[500px]">
                <div className=" flex flex-col gap-5">
                  <FormikController
                    control="input"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px] !w-[500px]"
                  />

                  <FormikController
                    control="input"
                    type="email"
                    placeholder="findseun@gmail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px] !w-[500px]"
                  />

                  <FormikController
                    control="input"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="input password"
                    className="py-[15px] !w-[500px]"
                  />

                  <div className="w-full div py-2">
                    <FormikController
                      control="select"
                      label=""
                      name="role"
                      value={formik.values.role}
                      onChange={(value: string) => {
                        formik.setFieldValue("role", value);
                      }}
                      onBlur={() => formik.setFieldTouched("role", true)}
                      placeholder="Select Roles"
                      options={[
                        { label: "Admin", value: "Admin" },
                        { label: "Manager", value: "Manager" },
                        { label: "Employee", value: "Employee" },
                      ]}
                      className="!w-[500px]"
                    />
                  </div>
                </div>

                <div className="text-right text-sm py-3">
                  {"have an account already?"}{" "}
                  <Link className="text-blue-500 pl-1" href="/auth/login">
                    {"login"}
                  </Link>
                </div>

                <Button
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                  className={`${
                    !formik.isValid ? "!bg-red-500" : "!bg-blue-500"
                  }  !mt-5 !disabled:cursor-not-allowed`}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
