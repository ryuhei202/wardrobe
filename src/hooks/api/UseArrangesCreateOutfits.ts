import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
import { Coordinate } from "../../model/selecting/arrange/Coordinate";
import { usePatchRequest } from "./UsePatchRequest";

type PostCreateOutfitParams = {
  coordinates: Coordinate[];
};

type TArrangesCreateOutfitsArg = {
  chartId: number;
  coordinates: Coordinate[];
};

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

  const { mutate, error, isLoading, isSuccess } = usePatchRequest(
    `kartes/${chartId}/coordinate`,
    params()
  );

  return {
    mutate,
    error,
    isLoading,
    isSuccess,
  };
};
