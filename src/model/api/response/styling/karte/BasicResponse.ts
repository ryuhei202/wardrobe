import MemberImageResponse from "./MemberImageResponse";

export default interface BasicResponse {
  readonly memberImages: MemberImageResponse[];
  readonly planName: string;
  readonly shipmentDate: string | null;
  readonly tChartId: number;
  readonly tMemberId: number;
  readonly memberName: string;
  readonly memberAge: number;
  readonly stylistName: string;
  readonly memberPrefecture: string;
  readonly rentalNum: number;
}
