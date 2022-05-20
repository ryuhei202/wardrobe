import { ImagePathResponse } from "./../ImagePathResponse";

export type ChartItemIndexResposne = {
  readonly id: number;
  readonly imagePaths: ImagePathResponse;
  readonly cateMediumId: number;
  readonly cateSmallId: number;
};
