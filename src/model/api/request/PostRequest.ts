export interface PostRequest {
  url(): string;
  params(): { [key: string]: any };
}
