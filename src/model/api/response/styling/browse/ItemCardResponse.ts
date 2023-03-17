export interface ItemCardResponse {
  readonly id: number;
  readonly mainColorImagePath: string;
  readonly subColorImagePath: string;
  readonly seriesName: string | null;
  readonly seriesFeature: string | null;
  readonly categoryName: string;
  readonly brandName: string;
  readonly imagePath: string;
  readonly isMarriage: boolean;
  readonly formalRank: number;
}
