import { MemberImageResponse } from "./MemberImageResponse";

export interface MemberShowResponse {
  readonly id: number;
  readonly name: string;
  readonly memberImages: MemberImageResponse[];
}
