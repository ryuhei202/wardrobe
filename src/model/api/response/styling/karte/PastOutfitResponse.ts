import PastOutfitItemResponse from "./PastOutfitItemResponse";

export default interface PastOutfitResponse {
  readonly feedback: string;
  readonly rentalStartedAt: string | null;
  readonly items: PastOutfitItemResponse[];
}
