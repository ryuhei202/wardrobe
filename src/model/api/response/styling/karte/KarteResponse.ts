import BasicResponse from "./BasicResponse";
import MemoResponse from "./MemoResponse";
import SizeResponse from "./SizeResponse";

export default interface KarteResponse {
  basic: BasicResponse;
  size: SizeResponse;
  memo: MemoResponse;
}
