import CasualPartSizeResponse from "./CasualPartSizeResponse";
import JacketPartSizeResponse from "./JacketPartSizeResponse";

export default interface SizeResponse {
  height: number;
  weight: number;
  bmi: number;
  casualPartSize: CasualPartSizeResponse;
  jacketPartSize: JacketPartSizeResponse;
}
