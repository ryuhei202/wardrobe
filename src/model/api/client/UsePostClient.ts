import PostRequest from "../request/PostRequest";
import { baseUrl } from "../shared/BaseUrl";
import { useClient } from "./UseClient";

export interface PostClient<T> {
  post(): Promise<T>;
}

export const usePostClient = <T>(request: PostRequest): PostClient<T> => {
  const client = useClient<T>();

  const post = (): Promise<T> => {
    const url = `${baseUrl}/${request.url()}`;
    const params = request.params();
    const api = client.createApi();
    return client.execute(api.post(url, params));
  };

  return { post };
};
