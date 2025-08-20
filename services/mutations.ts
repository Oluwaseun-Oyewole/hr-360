import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  register,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "./auth";
import {
  ForgotPasswordRequestBody,
  PasswordResetRequestBody,
  RegisterRequestBody,
  verifyOTPRequestBody,
} from "./auth/types";

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
    mutationFn: async () => await resendOTP(),
  });
  return { isOtpPending, OtpMutation };
};
