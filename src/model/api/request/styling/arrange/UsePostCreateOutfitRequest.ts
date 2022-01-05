import { Outfit } from "../../../../selecting/arrange/Outfit";
import { PostRequest } from "../../PostRequest";

interface PostCreateOutfitParams {
  chartId: number;
  outfits: Outfit[];
}

export const usePostCreateOutfitRequest = (
  karteId: number,
  outfits: Outfit[]
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
