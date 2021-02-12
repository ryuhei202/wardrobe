import AdviceChoiceResponse from "../../../api/response/styling/arrange/AdviceChoiceResponse";
import OutfitAdvice from "../OutfitAdvice";
import OutfitItem from "../OutfitItem";

export default interface OutfitFormData {
  readonly items: OutfitItem[];
  readonly advices: OutfitAdvice[];
}
