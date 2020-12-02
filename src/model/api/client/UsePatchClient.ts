import PatchRequest from "../request/PatchRequest";
import { baseUrl } from "../shared/BaseUrl";
import { useClient } from "./UseClient";

export interface PatchClient<T> {
  patch(): Promise<T>;
}

export const usePatchClient = <T>(request: PatchRequest): PatchClient<T> => {
  const client = useClient<T>();

  const patch = (): Promise<T> => {
    const url = `${baseUrl}/${request.url()}`;
    const params = request.params();
    const api = client.createApi();
    return client.execute(api.patch(url, params));
  };

  return { patch };
};
