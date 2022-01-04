import { InfoMemberImageResponse } from "../karte/InfoMemberImageResponse";

export interface MemberShowResponse {
  readonly id: number;
  readonly name: string;
  readonly memberImages: InfoMemberImageResponse[];
}
