export type Review = {
  readonly selectedOption: string;
  readonly reasons: string[];
  readonly text: string | null;
  readonly lineMessageUrl: string | null;
};
