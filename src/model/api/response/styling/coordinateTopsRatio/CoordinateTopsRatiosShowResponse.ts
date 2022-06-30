export interface CoordinateTopsRatiosShowResponse {
  readonly longSleeveNum: number | null;
  readonly shortSleeveNum: number | null;
  readonly topsNum: number | null;
  readonly jacketOption: {
    readonly isJacketRequested: boolean;
    readonly topsNum: number;
  } | null;
}
