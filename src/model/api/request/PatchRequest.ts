export default interface PatchRequest {
  url(): string;
  params(): FormData;
}
