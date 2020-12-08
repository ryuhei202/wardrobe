import Filter from "./Filter";

export default interface Refinement {
  largeCategory: Filter | null;
  mediumCategory: Filter | null;
  smallCategories: Filter[];
  sizes: Filter[];
  colors: Filter[];
  patterns: Filter[];
  logos: Filter[];
  options: Filter[];
  sort: number;
}
