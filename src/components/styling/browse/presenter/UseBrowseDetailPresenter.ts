import DetailResponse from "../../../../model/api/response/styling/browse/DetailResponse";
import { hostUrl } from "../../../../model/HostUrl";

export interface BrowseDetailPresenter {
  itemImageUrl: () => string;
  colorName: () => string;
  colorImageUrl: () => string;
}

export const useBrowseDetailPresenter = (
  response: DetailResponse
): BrowseDetailPresenter => {
  const itemImageUrl = (): string => {
    return `${hostUrl()}${response.itemImagePath}`;
  };

  const colorName = (): string => {
    return response.color.name;
  };

  const colorImageUrl = (): string => {
    return `${hostUrl()}${response.color.imagePath}`;
  };

  return { itemImageUrl, colorName, colorImageUrl };
};
