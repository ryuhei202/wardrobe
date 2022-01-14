import { ImagePathResponse } from "../ImagePathResponse";

export interface ItemFeedbackShowResponse {
  readonly chartItemId: number;
  readonly imagePath: ImagePathResponse;
  readonly textFeedback: string;
}
