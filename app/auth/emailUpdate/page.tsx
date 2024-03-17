"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { changeEmail } from "@/services/auth";
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

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    const response = await changeEmail({
      name: data?.user.name!,
      email: values.email,
      updateEmail: values.updateEmail,
    });

    if (response?.status === 200) {
      resetForm();
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Email Update</h1>
      <div className="w-[85%] lg:w-[40%]">
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
                  />
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

        <div className="text-primary-100 text-sm !py-3 cursor-pointer">
          <p onClick={() => router.back()}>Back</p>
        </div>
      </div>
    </div>
  );
};

export default EmailUpdate;
