import { SelectChoiceResponse } from "./SelectChoiceResponse";
import { ValidationError } from "../../../../styling/browse/ValidationError";

export interface ConfirmResponse {
  readonly validateErrors: ValidationError[];
  readonly stylistInfo: {
    selectChoice: SelectChoiceResponse[];
    selectedId: number | null;
  };
  readonly misplacedItems: string[];
}
