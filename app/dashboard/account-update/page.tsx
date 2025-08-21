"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect, routes } from "@/routes";
import { useUpdateAccountMutation } from "@/services/mutations";
import { EMPLOYMENT_TYPE, ROLES } from "@/utils/constants";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const AccountUpdate = () => {
  const router = useRouter();
  const { data, update } = useSession();

  const validationSchema = Yup.object({
    name: Yup.string().required("FullName is required"),
    role: Yup.string().required("Select Role"),
    employmentType: Yup.string().required("Select Employment Type"),
  });

  const { mutate, isPending } = useUpdateAccountMutation();

  const handleSubmit = async (values: Record<string, any>) => {
    return mutate(
      {
        email: data?.user.email!,
        name: values.name,
        role: values.role,
        employmentType: values.employmentType,
      },
      {
        onSuccess: (data) => {
          if (data) {
            update({
              name: values.name,
              role: values.role,
              employmentType: values.employmentType,
            });
            Toastify.success(data?.message);
            router.push(routes.dashboard);
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
            name: "",
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
                        options={ROLES}
                        error={formik.errors.role && formik.touched.role}
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
      </div>
    </div>
  );
};

export default AccountUpdate;
