import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import ErrorResponse from "../response/shared/ErrorResponse";

export interface Client<T> {
  createApi(): AxiosInstance;
  execute(method: Promise<AxiosResponse<T>>): Promise<T>;
}

export const useClient = <T>(): Client<T> => {
  const createApi = (): AxiosInstance => {
    return applyCaseMiddleware(axios.create());
  };

  const execute = (method: Promise<AxiosResponse<T>>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      method
        .then((results: AxiosResponse) => {
          resolve(results.data);
        })
        .catch((error: AxiosError) => {
          reject(createErrorResponse(error));
        });
    });
  };

  const createErrorResponse = (error: AxiosError): ErrorResponse => {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else {
      return {
        status: 0,
        message: "",
      };
    }
  };

  return { createApi, execute };
};
