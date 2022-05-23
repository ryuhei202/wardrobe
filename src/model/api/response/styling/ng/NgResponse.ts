import { ImagePathResponse } from "../ImagePathResponse";

export interface NgResponse {
  readonly id: number;
  readonly chartId: number;
  readonly contentText: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly itemImagePath: ImagePathResponse | null;
}
