import { InfoMemberImageResponse } from "../karte/InfoMemberImageResponse";

export interface MemberShowResponse {
  readonly memberName: string;
  readonly tMemberId: number;
  readonly memberImages: InfoMemberImageResponse[];
}
