export default interface GetRequest {
  url(): string;
  params?(): { [key: string]: any };
}
