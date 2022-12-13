import { TCategorizedHearing } from "./TCategorizedHearing";

export interface CoordinateHearingsShowResponse {
  readonly categorizedHearings: TCategorizedHearing[];
  readonly isSameBeforeHearing: boolean;
}
