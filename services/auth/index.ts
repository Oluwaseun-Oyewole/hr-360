import { handleRequestError } from "@/utils/request.error";
import Request from "..";
import { Endpoints } from "../endpoints";
import {
  AuthResponseBody,
  ForgotPasswordRequestBody,
  PasswordResetRequestBody,
  RegisterRequestBody,
  changeEmailRequestBody,
  resendOTPRequestBody,
  updateAccountRequestBody,
  verifyOTPRequestBody,
} from "./types";

export const register = async (data: RegisterRequestBody) => {
  try {
    return await Request.post<AuthResponseBody>(Endpoints.register, {
      data,
    });
  } catch (error) {
    handleRequestError(error);
  }
};

export const changeEmail = async (data: changeEmailRequestBody) => {
  try {
    return await Request.post<AuthResponseBody>(Endpoints.changeEmail, {
      data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    handleRequestError(error);
  }
};

export const forgotPassword = async (data: ForgotPasswordRequestBody) => {
  try {
    return await Request.post<AuthResponseBody>(Endpoints.forgotPassword, {
      data,
    });
  } catch (error) {
    handleRequestError(error);
  }
};

export const resetPassword = async (data: PasswordResetRequestBody) => {
  try {
    return await Request.post<AuthResponseBody>(Endpoints.resetPassword, {
      data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    handleRequestError(error);
  }
};

export const updateAccount = async (data: updateAccountRequestBody) => {
  try {
    return await Request.post<AuthResponseBody>(Endpoints.updateAccount, {
      data,
    });
  } catch (error) {
    handleRequestError(error);
  }
};

export const resendOTP = async (data: resendOTPRequestBody) => {
  try {
    return await Request.post(Endpoints.resendOTP, { data });
  } catch (error) {
    handleRequestError(error);
  }
};

export const verifyOTP = async (data: verifyOTPRequestBody) => {
  try {
    return await Request.post(Endpoints.verifyOTP, {
      data,
    });
  } catch (error) {
    handleRequestError(error);
  }
};
