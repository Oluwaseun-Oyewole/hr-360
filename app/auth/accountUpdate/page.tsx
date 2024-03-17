"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { login_redirect } from "@/routes";
import { updateAccount } from "@/services/auth";
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

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    const response = await updateAccount({
      email: data?.user.email!,
      name: values.name,
      role: values.role,
      employmentType: values.employmentType,
    });

    if (response?.status === 200) {
      update({
        name: values.name,
        role: values.role,
        employmentType: values.employmentType,
      });
      resetForm();
      router.push(login_redirect);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Account Update</h1>
      <div className="w-[85%] lg:w-[40%]">
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

        <div className="text-primary-100 text-sm !py-3 cursor-pointer">
          <p onClick={() => router.back()}>Back</p>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdate;
