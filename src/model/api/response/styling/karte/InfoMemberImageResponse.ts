import ImagePathResponse from "../ImagePathResponse";

export interface InfoMemberImageResponse {
  readonly imagePath: ImagePathResponse;
  readonly comment: string;
  readonly createdAt: string;
}
