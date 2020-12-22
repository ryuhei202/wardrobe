import MemoNgResponse from "./MemoNgResponse";

export default interface MemoResponse {
  readonly previousFeedback: string;
  readonly nextRequest: string;
  readonly otherNote: string;
  readonly ngs: MemoNgResponse[];
}
