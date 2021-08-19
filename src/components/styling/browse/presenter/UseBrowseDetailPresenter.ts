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
  mainColorName: () => string;
  mainColorImageUrl: () => string;
  subColorName: () => string;
  subColorImageUrl: () => string;
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

  const mainColorName = (): string => {
    return response.mainColor.name;
  };

  const mainColorImageUrl = (): string => {
    return `${HostUrl()}${response.mainColor.imagePath}`;
  };

  const subColorName = (): string => {
    return response.subColor.name;
  };

  const subColorImageUrl = (): string => {
    return `${HostUrl()}${response.subColor.imagePath}`;
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
    mainColorName,
    mainColorImageUrl,
    subColorName,
    subColorImageUrl,
  };
};
