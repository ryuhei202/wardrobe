import SelectChoiceResponse from "./SelectChoiceResponse";

export default interface SearchPrerequisiteResponse {
  readonly category: SelectChoiceResponse[];
  readonly silhouette: SelectChoiceResponse[];
}
