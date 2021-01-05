import MemoNgResponse from "./MemoNgResponse";
import PastOutfitResponse from "./PastOutfitResponse";

export default interface MemoResponse {
  readonly pastOutfits: PastOutfitResponse[];
  readonly nextRequest: string;
  readonly otherNote: string;
  readonly ngs: MemoNgResponse[];
}
