import BrowseIndexContentResponse from "./BrowseIndexContentResponse";

export default interface BrowseIndexResponse {
  totalCount: number;
  content: BrowseIndexContentResponse;
}
