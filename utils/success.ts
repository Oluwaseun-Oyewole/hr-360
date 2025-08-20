import { AxiosResponse } from "axios";
import { Toastify } from "./toasts";

type IResponse = { message: string; status: number } & AxiosResponse;
export const handleRequestSuccess = (data: IResponse) => {
  Toastify.success(data?.message, { style: { width: 400 } });
};

export const handleSuccessToast = (data: IResponse) => {
  Toastify.success(data?.message, { style: { width: 400 } });
};
