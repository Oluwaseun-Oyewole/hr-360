"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { routes } from "@/routes";
import { useForgotPasswordMutation } from "@/services/mutations";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface IProps {
  params: {
    jwt: string;
  };
}

const ForgotPassword = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email Required"),
  });

  const { mutate, isPending } = useForgotPasswordMutation();
  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      { email: values.email },
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
      <h1 className="text-center">Reset Your Password</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
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
                    error={formik.errors.email && formik.touched.email}
                  />
                </div>

                <Button
                  isLoading={formik.isSubmitting || isPending}
                  disabled={!formik.isValid || isPending}
                  className="!bg-blue-500 !mt-5"
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
