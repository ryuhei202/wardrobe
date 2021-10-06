import SelectedItem from "../../../model/styling/SelectedItem";

export interface SelectedItemArrayPresenter {
  itemIdText: (index: number) => string;
  itemImageUrl: (index: number) => string;
  locationName: (index: number) => string;
  sizeText: (index: number) => string[];
}

export const useSelectedItemArrayPresenter = (
  data: SelectedItem[]
): SelectedItemArrayPresenter => {
  const itemIdText = (index: number): string => {
    return `ID: ${data[index].itemId}`;
  };

  const itemImageUrl = (index: number): string => {
    return data[index].itemImagePath;
  };

  const locationName = (index: number): string => {
    return `棚番: ${data[index].locationName}`;
  };
  const sizeText = (index: number): string[] => {
    let textList = ["サイズ情報:"];
    data[index].partSizes.forEach((partSize) =>
      textList.push(`${partSize.name}: ${partSize.value ?? ""}`)
    );
    return textList;
  };

  return {
    itemIdText,
    itemImageUrl,
    locationName,
    sizeText,
  };
};
