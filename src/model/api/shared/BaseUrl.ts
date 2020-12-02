export const baseUrl = (): string => {
  const apiPath = "igoue_admin/wardrobe";
  if (process.env.NODE_ENV === "production") {
    return `https://leeap.jp/${apiPath}`;
  } else {
    return `http://localhost:3000/${apiPath}`;
  }
};
