/* eslint-disable valid-jsdoc */
import { COOKIES_KEYS } from "@/utils/constants";
import { getFromStorage } from "@/utils/helper";
import Axios, { AxiosRequestConfig } from "axios";

// const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
//   const token = getFromStorage(COOKIES_KEYS.TOKEN);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// };

Axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.data.message === "Auth token expired/invalid") {
      //  handle error here
    }
    return Promise.reject(error);
  }
);

// Axios.interceptors.request.use(authInterceptor);

const Request = {
  /**
   * Prepares request options
   *
   * @param {AxiosRequestConfig} axiosOpts
   * @param {string} authToken
   * @return {Object}
   */
  prepareOptions(axiosOpts?: AxiosRequestConfig | null, authToken?: string) {
    /* eslint-disable-next-line */
    const { url, method, headers, data, ...requestOptions } = axiosOpts || {};

    const options = {
      ...requestOptions,
      headers: {
        ...(headers || {}),
        authorization: "Bearer " + getFromStorage(COOKIES_KEYS.TOKEN),
      },
    };
    return { data, ...options };
  },
  /**
   * Makes a GET request
   *
   * @param {string} endpoint
   * @param {AxiosRequestConfig | null} options
   */

  async get<T = any>(endpoint: string, options?: AxiosRequestConfig | null) {
    return (await Axios.get(endpoint, options || {})).data;
  },

  /**
   * Makes a POST request
   *
   * @param endpoint
   * @param data
   * @param options
   */

  async post<T = any>(endpoint: string, options?: AxiosRequestConfig | null) {
    let postData;
    let requestOptions;

    if (options) {
      const { data, ...rest } = options;

      postData = data;
      requestOptions = rest;
    }

    return (await Axios.post(endpoint, postData, requestOptions)).data;
  },
};

export default Request;
