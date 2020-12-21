import qs from "qs";
import GetRequest from "../request/GetRequest";
import { baseUrl } from "../shared/BaseUrl";
import { useClient } from "./UseClient";

export interface GetClient<T> {
  get(): Promise<T>;
}

export const useGetClient = <T>(request: GetRequest): GetClient<T> => {
  const client = useClient<T>();
  const get = (): Promise<T> => {
    const url = `${baseUrl()}/${request.url()}`;
    const params = request.params ? request.params() : null;
    const api = client.createApi();
    return client.execute(
      api.get(url, {
        params: params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "brackets", encode: false }),
      })
    );
  };

  return { get };
};
