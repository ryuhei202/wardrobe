import { hostUrl } from "../../HostUrl";

export const baseUrl = (): string => {
  const apiPath = "igoue_admin/wardrobe";
  return `${hostUrl()}/${apiPath}`;
};
