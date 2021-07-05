import { InfoPastOutfitResponse } from "../../../api/response/styling/karte/InfoPastOutfitResponse";

export interface PastOutfitCollectionDialogData {
  readonly isOpen: boolean;
  readonly pastOutfitResponses: InfoPastOutfitResponse[];
}
