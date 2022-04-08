import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { usePostRequest } from "./UsePostRequest";
import { Coordinate } from "../../model/selecting/arrange/Coordinate";

type PostCreateOutfitParams = {
  chartId: number;
  coordinates: Coordinate[];
};

type TArrangesCreateOutfitsArg = PostCreateOutfitParams;

export const useArrangesCreateOutfits = ({
  coordinates,
  chartId,
}: TArrangesCreateOutfitsArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const params = (): PostCreateOutfitParams => {
    return {
      chartId: chartId,
      coordinates: coordinates.map((coordinate) => {
        return {
          id: coordinate.id,
          itemIds: coordinate.itemIds,
          adviceIds: coordinate.adviceIds,
          formalLevel: coordinate.formalLevel,
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
