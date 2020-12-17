import DetailResponse from "../../../../model/api/response/styling/browse/DetailResponse";
import { hostUrl } from "../../../../model/HostUrl";

export interface BrowseDetailPresenter {
  itemImageUrl: () => string;
  seriesName: () => string;
  brandName: () => string;
  colorName: () => string;
  colorImageUrl: () => string;
}

export const useBrowseDetailPresenter = (
  response: DetailResponse
): BrowseDetailPresenter => {
  const itemImageUrl = (): string => {
    return `${hostUrl()}${response.itemImagePath}`;
  };

  const seriesName = (): string => {
    return response.seriesName ?? "";
  };

  const brandName = (): string => {
    return response.brandName;
  };

  const colorName = (): string => {
    return response.color.name;
  };

  const colorImageUrl = (): string => {
    return `${hostUrl()}${response.color.imagePath}`;
  };

  return { itemImageUrl, seriesName, brandName, colorName, colorImageUrl };
};
