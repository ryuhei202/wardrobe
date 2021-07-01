import { InfoPastOutfitItemResponse } from "./InfoPastOutfitItemResponse";

export interface InfoPastOutfitResponse {
  readonly feedback: string;
  readonly rentalStartedAt: string | null;
  readonly items: InfoPastOutfitItemResponse[];
}
