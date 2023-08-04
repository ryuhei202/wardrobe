export type TRentalAppliedFilterData = {
  name: string;
  id: number;
  type: TType;
};

export type TType =
  | "itemId"
  | "smallCategory"
  | "mediumCategory"
  | "largeCategory"
  | "size"
  | "partSize"
  | "color"
  | "pattern"
  | "logo"
  | "dropSize"
  | "formalRank"
  | "rank"
  | "option";
