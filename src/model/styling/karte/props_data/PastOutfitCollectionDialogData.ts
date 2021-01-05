import PastOutfitResponse from "../../../api/response/styling/karte/PastOutfitResponse";

export default interface PastOutfitCollectionDialogData {
  readonly isOpen: boolean;
  readonly pastOutfitResponses: PastOutfitResponse[];
}
