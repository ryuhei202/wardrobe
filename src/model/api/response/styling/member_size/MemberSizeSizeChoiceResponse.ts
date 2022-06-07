import { SizeChoice } from "./SizeChoice";

export interface MemberSizeSizeChoiceResponse {
  readonly sizeTopsChoices: SizeChoice[];
  readonly sizeBottomsChoices: SizeChoice[];
  readonly sizeJacketChoices: SizeChoice[];
  readonly sizeDropSizeChoices: SizeChoice[];
}
