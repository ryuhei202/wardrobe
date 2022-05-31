import { SizeChoice } from "./SizeChoice";

export interface MemberSizeSizeChoiceResponse {
  readonly size_tops_choices: SizeChoice[];
  readonly size_bottoms_choices: SizeChoice[];
  readonly size_jacket_choices: SizeChoice[];
  readonly size_drop_size_choices: SizeChoice[];
}
