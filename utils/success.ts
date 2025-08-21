import { AxiosResponse } from "axios";
import { Toastify } from "./toasts";

type IResponse = { message: string; status: number } & AxiosResponse;
export const handleRequestSuccess = (data: IResponse) => {
  return Toastify.success(data?.message);
};

export const handleSuccessToast = (data: IResponse) => {
  return Toastify.success(data?.message);
};
