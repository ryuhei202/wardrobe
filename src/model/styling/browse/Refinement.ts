import ValueRefinement from "./ValueRefinement";

export default interface Refinement {
  readonly itemId: number | null;
  readonly largeCategoryId: number | null;
  readonly mediumCategoryId: number | null;
  readonly smallCategoryIds: number[];
  readonly sizeIds: number[];
  readonly partSizes: number[];
  readonly colorIds: number[];
  readonly patternIds: number[];
  readonly logoIds: number[];
  readonly dropSizes: number[];
  readonly optionIds: number[];
  readonly sortId: number;
  readonly pageNo: number;
}
