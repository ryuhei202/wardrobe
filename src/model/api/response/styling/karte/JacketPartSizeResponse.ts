export default interface JacketPartSizeResponse {
  readonly size: string;
  readonly dropSize: string;
  readonly shoulder: number | null;
  readonly bust: number | null;
  readonly lengthTop: number | null;
  readonly lengthArm: number | null;
}
