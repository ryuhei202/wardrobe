import { ImagePathResponse } from "../ImagePathResponse";

export interface MemberImageResponse {
  readonly imagePath: ImagePathResponse;
  readonly comment: string;
  readonly createdAt: string;
}
