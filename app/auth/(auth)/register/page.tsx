"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { register } from "@/services/auth";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const SignUp = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string().required("FullName is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/,
        "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
    role: Yup.string().required("Select Role"),
    employmentType: Yup.string().required("Select Employment Type"),
  });

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    const response = await register({
      name: values.name,
      email: values.email,
      role: values.role,
      employmentType: values.employmentType,
      password: values.password,
    });
    if (response?.statusCode === 200) {
      resetForm();
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Registration</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
            employmentType: "",
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
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <FormikController
                    control="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <FormikController
                    control="input"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className="py-[15px]"
                  />

                  <div className="flex flex-col lg:flex-row div py-2 gap-4">
                    <div className="lg:w-1/2">
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
                          { label: "HR Manager", value: "HR Manager" },
                          {
                            label: "Software Engineer",
                            value: "Software Engineer",
                          },
                          { label: "Marketing Ex", value: "Marketing Ex" },
                          {
                            label: "Financial Analyst",
                            value: "Financial Analyst",
                          },
                          {
                            label: "Project Manager",
                            value: "Project Manager",
                          },
                          { label: "Designer", value: "Designer" },
                          {
                            label: "Social Media Manager",
                            value: "Social Media Manager",
                          },
                          { label: "Accountant", value: "Accountant" },
                          {
                            label: "Business analyst",
                            value: "Business analyst",
                          },
                          {
                            label: "Sales representative",
                            value: "Sales representative",
                          },
                          {
                            label: "Customer service",
                            value: "Customer service",
                          },
                          {
                            label: "Administrative assistant",
                            value: "Administrative assistant",
                          },
                        ]}
                      />
                    </div>

                    <div className="lg:w-1/2">
                      <FormikController
                        control="select"
                        label=""
                        name="employmentType"
                        value={formik.values.employmentType}
                        onChange={(value: string) => {
                          formik.setFieldValue("employmentType", value);
                        }}
                        onBlur={() =>
                          formik.setFieldTouched("employmentType", true)
                        }
                        placeholder="Select employment type"
                        options={[
                          { label: "Full-Time", value: "Full-Time" },
                          {
                            label: "Part-Time",
                            value: "Part-Time",
                          },
                          {
                            label: "Contract",
                            value: "Contract",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                  className={`${"!bg-blue-500"}  !mt-5 !disabled:cursor-not-allowed`}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className="text-right text-sm py-3">
          Have an account already?
          <Link className="text-blue-500 pl-1" href="/auth/login">
            {"login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
