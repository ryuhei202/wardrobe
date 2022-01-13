import { KarteOutfitResponse } from "./KarteOutfitResponse";
import { KarteItemResponse } from "./KarteItemResponse";
import { StylingReferenceResponse } from "../StylingReferenceResponse";

export interface KarteIndexResponse {
  readonly feedback: string;
  readonly rentalStartedAt: string | null;
  readonly stylingReferences: StylingReferenceResponse[];
  readonly outfits: KarteOutfitResponse[];
  readonly items: KarteItemResponse[];
}
