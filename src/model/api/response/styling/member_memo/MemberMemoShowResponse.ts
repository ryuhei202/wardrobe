import { TNextHearingCoorde } from "./NextHearingCoorde";

export interface MemberMemoShowResponse {
  readonly memo: string;
  readonly memoNext: string;
  readonly lineSurveyNext: string | null;
  readonly nextHearingCoorde: TNextHearingCoorde;
}
