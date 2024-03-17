import { AxiosResponse } from "axios";
import { Toastify } from "./toasts";

type IResponse = { message: string; status: number } & AxiosResponse;
export const handleRequestSuccess = (data: IResponse) => {
  Toastify.success(data?.message);
};
