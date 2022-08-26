import { MemberImageResponse } from "./MemberImageResponse";

export interface MemberShowResponse {
  readonly id: number;
  readonly name: string;
  readonly memberImages: MemberImageResponse[];
  readonly isMarriagePlan: boolean;
  readonly age: number;
  readonly pref: string;
  readonly aboutSize: string | null;
}
