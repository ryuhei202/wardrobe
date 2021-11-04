import { PutRequest } from "../request/PutRequest";
import { baseUrl } from "../shared/BaseUrl";
import { useClient } from "./UseClient";

export interface PutClient<T> {
  put(): Promise<T>;
}

export const usePutClient = <T>(request: PutRequest): PutClient<T> => {
  const client = useClient<T>();

  const put = (): Promise<T> => {
    const url = `${baseUrl()}/${request.url()}`;
    const params = request.params();
    const api = client.createApi();
    return client.execute(api.put(url, params));
  };

  return { put };
};
