export interface LoginRequestBody {
  email: string;
  password: string;
  redirect: boolean;
}
export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
  employmentType: string;
}

export interface AuthResponseBody {
  data: { message: string; status: number };
}

export interface PasswordResetRequestBody {
  jwtUserId: string;
  password: string;
  confirm_password: string;
}
export interface ForgotPasswordRequestBody {
  email: string;
}

export interface changeEmailRequestBody {
  name: string;
  email: string;
  updateEmail: string;
}

export interface updateAccountRequestBody {
  email: string;
  name: string;
  role: string;
  employmentType: string;
}

export interface resendOTPRequestBody {
  email: string;
}

export interface verifyOTPRequestBody {
  otpCode: string;
}
