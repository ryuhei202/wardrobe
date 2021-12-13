export const HostUrl = (): string => {
  if (process.env.REACT_APP_ENV === "staging") {
    return process.env.REACT_APP_HOST_URL_STAGING ?? "";
  }
  return process.env.REACT_APP_HOST_URL ?? "";
};
