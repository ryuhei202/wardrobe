import { InfoPastOutfitResponse } from "../../../api/response/styling/karte/InfoPastOutfitResponse";

export interface PastOutfitCollectionData {
  readonly pastOutfitResponses: InfoPastOutfitResponse[];
  readonly displayOutfitNum?: number;
}
