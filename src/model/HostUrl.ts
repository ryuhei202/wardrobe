export const HostUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return "https://leeap.jp";
  } else {
    return `http://localhost:3000`;
  }
};
