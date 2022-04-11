import { KarteItemResponse } from "./KarteItemResponse";
import { StylingReferenceResponse } from "../StylingReferenceResponse";
import { KarteCoordinateResponse } from "./KarteCoordinateResponse";

export interface KarteIndexResponse {
  readonly feedback: string;
  readonly rentalStartedAt: string | null;
  readonly stylingReferences: StylingReferenceResponse[];
  readonly coordinates: KarteCoordinateResponse[];
  readonly items: KarteItemResponse[];
}
