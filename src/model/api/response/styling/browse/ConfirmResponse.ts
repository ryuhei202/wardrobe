import CoordinatorChoiceResponse from "./CoordinatorChoiceResponse";
import ValidationResponse from "./ValidationResponse";

export default interface ConfirmResponse {
  readonly validateErrors: ValidationResponse[];
  readonly stylistChoice: CoordinatorChoiceResponse[];
  readonly misplacedItems: string[];
}
