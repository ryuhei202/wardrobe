import CreatingOutfit from "../../../../styling/arrange/CreatingOutfit";
import PostRequest from "../../PostRequest";

interface PostCreateOutfitParams {
  chartId: number;
  outfits: { itemIds: number[]; adviceIds: number[] }[];
}

export const usePostCreateOutfitRequest = (
  karteId: number,
  outfits: CreatingOutfit[]
): PostRequest => {
  const url = (): string => {
    return "styling/arranges/create_outfits";
  };

  const params = (): PostCreateOutfitParams => {
    return {
      chartId: karteId,
      outfits: outfits.map((outfit) => {
        return {
          itemIds: outfit.itemIds,
          adviceIds: outfit.adviceIds,
        };
      }),
    };
  };

  return { url, params };
};
