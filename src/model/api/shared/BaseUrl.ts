import { HostUrl } from "./../../HostUrl";

export const baseUrl = (): string => {
  const apiPath = "igoue_admin/wardrobe";
  return `${HostUrl()}/${apiPath}`;
};
