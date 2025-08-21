import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import {
  forgotPassword,
  register,
  resendOTP,
  resetPassword,
  updateAccount,
  verifyOTP,
} from "./auth";
import { changeEmail } from "./auth/index";
import {
  changeEmailRequestBody,
  ForgotPasswordRequestBody,
  PasswordResetRequestBody,
  RegisterRequestBody,
  resendOTPRequestBody,
  updateAccountRequestBody,
  verifyOTPRequestBody,
} from "./auth/types";
import { LoginRequestBody } from "./types";

export const useLoginMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginRequestBody) =>
      await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/dashboard",
      }),
  });
  return { isPending, mutate };
};

export const useRegisterMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterRequestBody) => await register(values),
  });
  return { isPending, mutate };
};

export const useVerifyMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: verifyOTPRequestBody) => await verifyOTP(values),
  });
  return { isPending, mutate };
};

export const useForgotPasswordMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ForgotPasswordRequestBody) =>
      await forgotPassword(values),
  });
  return { isPending, mutate };
};

export const useResetPasswordMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PasswordResetRequestBody) =>
      await resetPassword(values),
  });
  return { isPending, mutate };
};

export const useSendOtpMutation = () => {
  const { mutate: OtpMutation, isPending: isOtpPending } = useMutation({
    mutationFn: async (values: resendOTPRequestBody) => await resendOTP(values),
  });
  return { isOtpPending, OtpMutation };
};

export const useUpdateAccountMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: updateAccountRequestBody) =>
      await updateAccount(values),
  });
  return { isPending, mutate };
};

export const useUpdateEmailMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: changeEmailRequestBody) =>
      await changeEmail(values),
  });
  return { isPending, mutate };
};
