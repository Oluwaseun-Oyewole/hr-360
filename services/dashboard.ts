import { handleRequestError } from "@/utils/request.error";
import Request from ".";
import { AddEmployeeInterface } from "./auth/types";
import { Endpoints } from "./endpoints";
import { EmployeeInterface } from "./types";

export const getEmployees = async (params: EmployeeInterface) => {
  try {
    return await Request.get(Endpoints.employees, { params });
  } catch (error) {
    handleRequestError(error);
  }
};

export const addEmployee = async (data: AddEmployeeInterface) => {
  try {
    return await Request.post(Endpoints.addEmployee, {
      data,
    });
  } catch (error) {
    handleRequestError(error);
  }
};
