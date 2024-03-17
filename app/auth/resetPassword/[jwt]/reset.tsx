"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { resetPassword } from "@/services/auth";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface IProps {
  params: {
    jwt: string;
  };
}

const PasswordReset = ({ params: { jwt } }: IProps) => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    const response = await resetPassword({
      jwtUserId: jwt,
      password: values.password,
      confirm_password: values.confirm_password,
    });

    if (response?.statusCode === 200) {
      resetForm();
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Password Reset Form</h1>
      <div>
        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
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
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter password"
                    className="py-[15px] !w-[500px]"
                    onCopy={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                    onPaste={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                  />

                  <FormikController
                    control="input"
                    type="password"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Confirm password"
                    className="py-[15px] !w-[500px]"
                    onCopy={(e: any) => {
                      console.log("trying to copy");
                      e.preventDefault();
                      return false;
                    }}
                    onPaste={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
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

export default PasswordReset;
