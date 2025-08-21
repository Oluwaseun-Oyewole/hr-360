"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { routes } from "@/routes";
import { useRegisterMutation } from "@/services/mutations";
import { COOKIES_KEYS, EMPLOYMENT_TYPE, ROLES } from "@/utils/constants";
import { saveToStorage } from "@/utils/helper";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import * as Yup from "yup";

const SignUp = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    if (window && typeof window !== undefined) {
      router.replace("/auth/register");
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters"),
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

  const { mutate, isPending } = useRegisterMutation();
  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      {
        name: values.name,
        email: values.email,
        role: values.role,
        employmentType: values.employmentType,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          console.log("data is ", data);
          if (data) {
            Toastify.success(data?.message);
            saveToStorage(COOKIES_KEYS.TOKEN, data?.token);
            router.replace(routes.verify);
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light mt-20 lg:mt-14">
      <h1>Registration</h1>
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
                    error={formik.errors.name && formik.touched.name}
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
                    error={formik.errors.email && formik.touched.email}
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
                    error={formik.errors.password && formik.touched.password}
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
                        error={formik.errors.role && formik.touched.role}
                        onBlur={() => formik.setFieldTouched("role", true)}
                        placeholder="Select Roles"
                        options={ROLES}
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
                        options={EMPLOYMENT_TYPE}
                        error={
                          formik.errors.employmentType &&
                          formik.touched.employmentType
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button
                  isLoading={formik.isSubmitting || isPending}
                  disabled={!formik.isValid || isPending}
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
          <Link className="text-blue-700 pl-1" href={routes.login}>
            {"login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
