import BasicResponse from "./BasicResponse";
import MemoResponse from "./MemoResponse";
import SizeResponse from "./SizeResponse";

export default interface KarteResponse {
  readonly basic: BasicResponse;
  readonly size: SizeResponse;
  readonly memo: MemoResponse;
  readonly rentableItemNum: number;
}
