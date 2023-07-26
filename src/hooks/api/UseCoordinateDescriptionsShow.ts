import { CoordinateDescriptionsShowResponse } from "./../../model/api/response/styling/coordinateDescription/CoordinateDescriptionsShowResponse";
import { useGetRequest } from "./UseGetRequest";

type TCoordinateDescriptionsShowArg = {
  coordinateId: number;
};

export const useCoordinateDescriptionsShow = ({
  coordinateId,
}: TCoordinateDescriptionsShowArg) => {
  const { data, error, refetch } =
    useGetRequest<CoordinateDescriptionsShowResponse>(
      `styling/coordinates/${coordinateId}/coordinate_description`,
    );

  return { data, error, refetch };
};
