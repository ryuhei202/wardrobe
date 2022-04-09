export interface KarteCoordinateResponse {
  readonly items: {
    readonly itemId: number;
    readonly imageFileName: string;
  }[];
  readonly advices: string[];
}
