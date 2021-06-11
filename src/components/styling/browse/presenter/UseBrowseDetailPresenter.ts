import { HostUrl } from "./../../../../model/HostUrl";
import DetailResponse from "../../../../model/api/response/styling/browse/DetailResponse";

export interface BrowseDetailPresenter {
  imageGalleryList: () => {
    originalImagePath: string;
    thumbnailImagePath: string;
  }[];
  seriesName: () => string;
  categoryName: () => string;
  brandName: () => string;
  colorName: () => string;
  colorImageUrl: () => string;
}

export const useBrowseDetailPresenter = (
  response: DetailResponse
): BrowseDetailPresenter => {
  const seriesName = (): string => {
    return response.seriesName ?? "";
  };

  const categoryName = (): string => {
    return response.categoryName;
  };

  const brandName = (): string => {
    return response.brandName;
  };

  const colorName = (): string => {
    return response.color.name;
  };

  const colorImageUrl = (): string => {
    return `${HostUrl()}${response.color.imagePath}`;
  };

  const imageGalleryList = (): {
    originalImagePath: string;
    thumbnailImagePath: string;
  }[] => {
    let itemImage = [
      {
        originalImagePath: `${HostUrl()}${response.itemImagePath.original}`,
        thumbnailImagePath: `${HostUrl()}${response.itemImagePath.thumb}`,
      },
    ];
    let outfitImages = response.outfitImagePaths.map((imagePath) => {
      return {
        originalImagePath: `${HostUrl()}${imagePath.original}`,
        thumbnailImagePath: `${HostUrl()}${imagePath.thumb}`,
      };
    });
    return itemImage.concat(outfitImages);
  };

  return {
    imageGalleryList,
    seriesName,
    categoryName,
    brandName,
    colorName,
    colorImageUrl,
  };
};
