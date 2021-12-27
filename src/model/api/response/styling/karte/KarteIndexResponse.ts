import { KartesOutfitResponse } from "./KartesOutfitResponse";
import { KartesItemResponse } from "./KartesItemResponse";
import { StylingReferenceResponse } from "../StylingReferenceResponse";

export interface KarteIndexResponse {
  readonly feedback: string;
  readonly rentalStartedAt: string | null;
  readonly stylingReferences: StylingReferenceResponse[];
  readonly outfits: KartesOutfitResponse[];
  readonly items: KartesItemResponse[];
}
