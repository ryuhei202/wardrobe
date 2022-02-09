import { useContext } from "react";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "./UsePostRequest";
import { Outfit } from "../../model/selecting/arrange/Outfit";

type PostCreateOutfitParams = {
  chartId: number;
  outfits: Outfit[];
};
export const useArrangesCreateOutfits = ({
  outfits,
  chartId,
}: PostCreateOutfitParams): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const params = (): PostCreateOutfitParams => {
    return {
      chartId: chartId,
      outfits: outfits.map((outfit) => {
        return {
          itemIds: outfit.itemIds,
          adviceIds: outfit.adviceIds,
        };
      }),
    };
  };

  const { mutate, error, isLoading, isSuccess } = usePostRequest(
    "arranges/create_outfits",
    params()
  );

  return {
    mutate,
    error,
    isLoading,
    isSuccess,
  };
};
