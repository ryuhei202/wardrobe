import ImagePathResponse from "../ImagePathResponse";

export interface NgResponse {
  readonly contentText: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly itemImagePath: ImagePathResponse | null;
}
