import SelectChoiceResponse from "./SelectChoiceResponse";
import ValidationResponse from "./ValidationResponse";

export default interface ConfirmResponse {
  readonly validateErrors: ValidationResponse[];
  readonly stylistChoice: SelectChoiceResponse[];
  readonly misplacedItems: string[];
}
