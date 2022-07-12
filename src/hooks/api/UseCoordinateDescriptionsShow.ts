import { useGetRequest } from "./UseGetRequest";
import { CoordinateDescriptionsShowResponse } from "./../../model/api/response/styling/coordinateDescription/CoordinateDescriptionsShowResponse";

type TCoordinateDescriptionsShowArg = {
  coordinateId: number;
};

export const useCoordinateDescriptionsShow = ({
  coordinateId,
}: TCoordinateDescriptionsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateDescriptionsShowResponse>(
      `coordinates/${coordinateId}/coordinate_description`
    );

  return { data, error, refetch };
};
