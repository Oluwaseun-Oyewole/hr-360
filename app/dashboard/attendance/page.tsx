"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useAddNewEmployeeMutation } from "../store/query";

const DashboardForm = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    employeeName: Yup.string().trim().required("Employee name is required"),
    employmentType: Yup.string().required("Employee type is required"),
    status: Yup.string().required("Status is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
    checkIn: Yup.number().required("check in is required"),
    checkOut: Yup.number().required("check out is required"),
    overTime: Yup.number().required("Overtime is required"),
    role: Yup.string().required("Select Role"),
  });

  const [addNewEmployee, response] = useAddNewEmployeeMutation();
  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    try {
      const res: any = await addNewEmployee(values);
      if (!res?.error) {
        Toastify.success(res?.data?.message);
        resetForm();
      } else {
        Toastify.error(res?.error?.data?.message);
      }
    } catch (error) {
      Toastify.error("An error ocurred");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light">
      <h1 className="text-center">Attendance Form</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            employeeName: "",
            employmentType: "",
            status: "",
            email: "",
            checkIn: "",
            checkOut: "",
            overTime: "",
            role: "",
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
                    placeholder="Employee name"
                    name="employeeName"
                    value={formik.values.employeeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <FormikController
                    control="input"
                    type="number"
                    placeholder="check in"
                    name="checkIn"
                    value={formik.values.checkIn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <FormikController
                    control="input"
                    type="number"
                    placeholder="overtime"
                    name="overTime"
                    value={formik.values.overTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <FormikController
                    control="input"
                    type="number"
                    placeholder="checkout"
                    name="checkOut"
                    value={formik.values.checkOut}
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

                  <div className="flex flex-col lg:flex-row div py-2 gap-4">
                    <div className="lg:w-1/2">
                      <FormikController
                        control="select"
                        label=""
                        name="status"
                        value={formik.values.status}
                        onChange={(value: string) => {
                          formik.setFieldValue("status", value);
                        }}
                        onBlur={() => formik.setFieldTouched("status", true)}
                        placeholder="Select Status"
                        options={[
                          { label: "Present", value: "Present" },
                          { label: "Absent", value: "Absent" },
                          {
                            label: "Late",
                            value: "Late",
                          },
                        ]}
                      />
                    </div>
                  </div>

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
          <Link className="text-blue-500 pl-1" href="/dashboard">
            {"dashboard"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
