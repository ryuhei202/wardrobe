import Filter from "./Filter";

export default interface Refinement {
  readonly largeCategory: Filter | null;
  readonly mediumCategory: Filter | null;
  readonly smallCategories: Filter[];
  readonly sizes: Filter[];
  readonly colors: Filter[];
  readonly patterns: Filter[];
  readonly logos: Filter[];
  readonly options: Filter[];
  readonly sort: number;
  readonly pageNo: number;
}
