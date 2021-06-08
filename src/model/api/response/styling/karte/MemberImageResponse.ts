import ImagePathResponse from "./ImagePathResponse";

export default interface MemberImageResponse {
  readonly imagePath: ImagePathResponse;
  readonly comment: string;
  readonly createdAt: string;
}
