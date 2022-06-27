export interface CoordinateHearingsShowResponse {
  readonly hearing_category: string;
  readonly hearing_questions: {
    readonly title: string;
    readonly answer: {
      readonly name: string;
      readonly text: string | null;
    }[];
  }[];
}
