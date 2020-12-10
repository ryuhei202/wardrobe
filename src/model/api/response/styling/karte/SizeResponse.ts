import CasualPartSizeResponse from "./CasualPartSizeResponse";
import JacketPartSizeResponse from "./JacketPartSizeResponse";

export default interface SizeResponse {
  readonly height: number;
  readonly weight: number;
  readonly bmi: number;
  readonly casualPartSize: CasualPartSizeResponse;
  readonly jacketPartSize: JacketPartSizeResponse;
}
