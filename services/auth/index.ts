import { handleRequestError } from "@/utils/request.error";
import { handleRequestSuccess } from "@/utils/success";
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
    const response = await Request.post<AuthResponseBody>(Endpoints.register, {
      data,
    });
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const changeEmail = async (data: changeEmailRequestBody) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.changeEmail,
      {
        data,
        headers: { "Content-Type": "application/json" },
      }
    );
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const forgotPassword = async (data: ForgotPasswordRequestBody) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.forgotPassword,
      {
        data,
      }
    );
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const resetPassword = async (data: PasswordResetRequestBody) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.resetPassword,
      {
        data,
        headers: { "Content-Type": "application/json" },
      }
    );
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updateAccount = async (data: updateAccountRequestBody) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.updateAccount,
      {
        data,
      }
    );
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const resendOTP = async (data: resendOTPRequestBody) => {
  try {
    const response = await Request.post(Endpoints.resendOTP, {
      data,
    });
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const verifyOTP = async (data: verifyOTPRequestBody) => {
  try {
    const response = await Request.post(Endpoints.verifyOTP, {
      data,
    });
    handleRequestSuccess(response);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
