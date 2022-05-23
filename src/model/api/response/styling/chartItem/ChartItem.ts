import { ImagePathResponse } from "../ImagePathResponse";

export type ChartItem = {
  readonly id: number;
  readonly imagePaths: ImagePathResponse;
  readonly cateMediumId: number;
  readonly cateSmallId: number;
};
