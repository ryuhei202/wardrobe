export interface KarteOutfitResponse {
  readonly items: {
    readonly itemId: number;
    readonly imageFileName: string;
  }[];
  readonly advices: string[];
}
