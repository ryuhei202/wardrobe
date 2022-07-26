export interface CoordinateHearingsShowResponse {
  readonly hearingCategory: string;
  readonly hearingQuestions: {
    readonly title: string;
    readonly answers: {
      readonly name: string;
      readonly text: string | null;
    }[];
  }[];
}
