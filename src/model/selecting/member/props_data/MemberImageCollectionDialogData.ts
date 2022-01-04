import { MemberImageResponse } from "../../../api/response/styling/member/MemberImageResponse";

export interface MemberImageCollectionDialogData {
  readonly isOpen: boolean;
  readonly imageResponses: MemberImageResponse[];
}
