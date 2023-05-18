export type TMemberSizes = {
  basicSizes: TMemberBasicSizes;
  partSizes: TMemberPartSizes;
};

export type TMemberBasicSizesKey =
  | "bmi"
  | "height"
  | "weight"
  | "tops"
  | "topsAdmin"
  | "bottoms"
  | "bottomsAdmin"
  | "jacketAdmin"
  | "dropSizeAdmin"
  | "referenceJacketSize"
  | "referenceJacketDropSize";

export type TMemberBasicSizesEditableKey =
  | "height"
  | "weight"
  | "topsAdmin"
  | "jacketAdmin"
  | "dropSizeAdmin";

export type TMemberBasicSizes = {
  bmi: number;
  height: number;
  weight: number;
  tops: number;
  topsAdmin: number;
  bottoms: number;
  bottomsAdmin: number;
  jacketAdmin: number;
  dropSizeAdmin: number;
  referenceJacketSize: number;
  referenceJacketDropSize: number;
  choices: Object;
};

export type TMemberPartSizesKey =
  | "sholder"
  | "bust"
  | "lengthTop"
  | "lengthArm"
  | "waist"
  | "hip"
  | "roundLeg"
  | "lengthLeg"
  | "roundCalf";

export type TMemberPartSizes = {
  [key in TMemberPartSizesKey]: TMemberPartSize;
};

export type TMemberPartSize = {
  label: string;
  size: number | null;
  referenceSize: number;
  jacketSize?: number | null;
};

export type TMemberPartSizeEditableKey = "size" | "jacketSize";
