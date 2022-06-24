export const HostUrl = (): string => {
  return process.env.REACT_APP_HOST_URL ?? "";
};
