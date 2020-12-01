export default interface PostRequest {
  url(): string;
  params(): FormData;
}
