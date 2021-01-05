import MemberImageResponse from "../../../api/response/styling/karte/MemberImageResponse";

export default interface MemberImageCollectionDialogData {
  readonly isOpen: boolean;
  readonly imageResponses: MemberImageResponse[];
}
