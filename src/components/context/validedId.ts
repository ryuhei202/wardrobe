export const validedId = (idStr: string | null) => {
  const idNum = Number(idStr);
  return isNaN(idNum) || idNum === 0 ? null : idNum;
};
