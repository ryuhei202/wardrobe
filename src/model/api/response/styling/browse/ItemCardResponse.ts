import FilterChoiceResponse from "./FilterChoiceResponse";
import FilterResponse from "./FilterResponse";

export default interface ItemCardResponse {
  id: number;
  mColorId: number;
  seriesName: string;
  categoryName: string;
  brandName: string;
  imageUrl: string;
}
