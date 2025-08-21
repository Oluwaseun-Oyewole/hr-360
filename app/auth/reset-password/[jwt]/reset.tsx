"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { routes } from "@/routes";
import { useResetPasswordMutation } from "@/services/mutations";
import { Toastify } from "@/utils/toasts";
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
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const { mutate, isPending } = useResetPasswordMutation();
  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      {
        jwtUserId: jwt,
        password: values.password,
        confirm_password: values.confirm_password,
      },
      {
        onSuccess: (data) => {
          if (data) {
            Toastify.success(data?.message);
            router.replace(routes.login);
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Password Reset Form</h1>
      <div className="w-[80%] lg:w-[40%]">
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
              <Form>
                <div className="flex flex-col gap-5">
                  <FormikController
                    control="input"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter password"
                    className="py-[15px]"
                    onCopy={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                    onPaste={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                    error={formik.errors.password && formik.touched.password}
                  />

                  <FormikController
                    control="input"
                    type="password"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Confirm password"
                    className="py-[15px]"
                    onCopy={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                    onPaste={(e: any) => {
                      e.preventDefault();
                      return false;
                    }}
                    error={
                      formik.errors.confirm_password &&
                      formik.touched.confirm_password
                    }
                  />
                </div>

                <Button
                  isLoading={formik.isSubmitting || isPending}
                  disabled={!formik.isValid || isPending}
                  className={`${"!bg-blue-500"} !mt-5 !disabled:cursor-not-allowed`}
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
