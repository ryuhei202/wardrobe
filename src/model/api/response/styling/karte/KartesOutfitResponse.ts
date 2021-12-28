export interface KartesOutfitResponse {
  readonly items: {
    readonly itemId: number;
    readonly imageFileName: string;
  }[];
  readonly advices: string[];
}
