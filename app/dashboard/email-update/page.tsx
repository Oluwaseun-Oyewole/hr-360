"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { routes } from "@/routes";
import { useUpdateEmailMutation } from "@/services/mutations";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const EmailUpdate = () => {
  const router = useRouter();
  const { data } = useSession();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
    updateEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
  });
  const { mutate, isPending } = useUpdateEmailMutation();
  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      {
        name: data?.user.name!,
        email: values.email,
        updateEmail: values.updateEmail,
      },
      {
        onSuccess: (data) => {
          if (data) {
            Toastify.success(data?.message);
            router.push(routes.dashboard);
            return;
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light pt-10 md:pt-14">
      <div className="w-full md:w-[65%] xl:w-[50%]">
        <Formik
          initialValues={{
            email: "",
            updateEmail: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-5">
                  <FormikController
                    control="input"
                    type="email"
                    placeholder="Old Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                    error={formik.errors.email && formik.touched.email}
                  />

                  <FormikController
                    control="input"
                    type="email"
                    placeholder="New Email"
                    name="updateEmail"
                    value={formik.values.updateEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                    error={
                      formik.errors.updateEmail && formik.touched.updateEmail
                    }
                  />
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
      </div>
    </div>
  );
};

export default EmailUpdate;
