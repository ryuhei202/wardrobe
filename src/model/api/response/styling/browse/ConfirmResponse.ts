import SelectChoiceResponse from "./SelectChoiceResponse";
import ValidationError from "../../../../styling/browse/ValidationError";

export default interface ConfirmResponse {
  readonly validateErrors: ValidationError[];
  readonly stylistChoice: SelectChoiceResponse[];
  readonly misplacedItems: string[];
}
