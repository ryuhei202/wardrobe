import SelectedOutfit from "../../../../styling/arrange/SelectedOutfit";
import PostRequest from "../../PostRequest";

interface PostCreateOutfitParams {
  chartId: number;
  outfits: { itemIds: number[]; adviceIds: number[] }[];
}

export const usePostCreateOutfitRequest = (
  karteId: number,
  selectedOutfits: SelectedOutfit[]
): PostRequest => {
  const url = (): string => {
    return "styling/arranges/create_outfits";
  };

  const params = (): PostCreateOutfitParams => {
    return {
      chartId: karteId,
      outfits: selectedOutfits.map((outfit) => {
        return {
          itemIds: outfit.itemIds,
          adviceIds: outfit.advices.reduce((result: number[], advice) => {
            if (advice.adviceId) result.push(advice.adviceId);
            return result;
          }, []),
        };
      }),
    };
  };

  return { url, params };
};
