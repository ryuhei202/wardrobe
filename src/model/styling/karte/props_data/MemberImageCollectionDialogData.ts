import { InfoMemberImageResponse } from "../../../api/response/styling/karte/InfoMemberImageResponse";

export interface MemberImageCollectionDialogData {
  readonly isOpen: boolean;
  readonly imageResponses: InfoMemberImageResponse[];
}
