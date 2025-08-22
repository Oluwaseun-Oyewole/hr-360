"use client";
import Button from "@/components/button";
import FormikController from "@/components/form/form-controller";
import { AddEmployeeInterface } from "@/services/auth/types";
import { useAddEmployeeMutation } from "@/services/mutations";
import { EMPLOYMENT_TYPE, ROLES } from "@/utils/constants";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const DashboardForm = () => {
  const validationSchema = Yup.object({
    employeeName: Yup.string().trim().required("Employee name is required"),
    employmentType: Yup.string().required("Employee type is required"),
    status: Yup.string().required("Status is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required."),
    checkIn: Yup.date()
      .min(new Date(), "Check in time should not be in the past")
      .required("Please select your check in time"),
    checkOut: Yup.date()
      .min(new Date(), "Check out time should not be in the past")
      .required("Please select your check out time"),
    // overTime: Yup.number().required("Overtime is required"),
    role: Yup.string().required("Select Role"),
  });

  const { mutate, isPending } = useAddEmployeeMutation();
  const handleSubmit = async (
    values: AddEmployeeInterface,
    { resetForm }: any
  ) => {
    const formattedValues = {
      ...values,
      checkIn: values.checkIn ? new Date(values.checkIn) : null,
      checkOut: values.checkOut ? new Date(values.checkOut) : null,
    };

    mutate(
      { ...formattedValues },
      {
        onSuccess: (response) => {
          if (response) {
            Toastify.success(response?.message);
            resetForm();
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light pt-10 md:pt-14">
      <div className="w-[85%] md:w-[60%] lg:w-[70%]">
        <Formik
          //@ts-ignore
          initialValues={{
            employeeName: "",
            employmentType: null,
            status: null,
            email: "",
            checkIn: new Date(),
            checkOut: new Date(),
            overTime: null,
            role: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex gap-5 w-full">
                    <div className="w-full">
                      <FormikController
                        control="input"
                        type="text"
                        placeholder="Employee name"
                        name="employeeName"
                        value={formik.values.employeeName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-[15px]"
                        error={
                          formik.errors.employeeName &&
                          formik.touched.employeeName
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormikController
                        control="input"
                        type="datetime-local"
                        placeholder="check in"
                        name="checkIn"
                        value={formik.values.checkIn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-[15px]"
                        error={formik.errors.checkIn && formik.touched.checkIn}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-full">
                      <FormikController
                        control="input"
                        type="number"
                        placeholder="overtime"
                        name="overTime"
                        value={formik.values.overTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-[15px]"
                        error={
                          formik.errors.overTime && formik.touched.overTime
                        }
                      />
                    </div>

                    <div className="w-full">
                      <FormikController
                        control="input"
                        type="datetime-local"
                        placeholder="checkout"
                        name="checkOut"
                        value={formik.values.checkOut}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-[15px]"
                        error={
                          formik.errors.checkOut && formik.touched.checkOut
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-full">
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
                    </div>
                    <div className="w-full">
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
                        error={formik.errors.status && formik.touched.status}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row div py-2 gap-5">
                    <div className="w-full">
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

                    <div className="w-full">
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

export default DashboardForm;
