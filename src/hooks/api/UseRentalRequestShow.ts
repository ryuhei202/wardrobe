import { useGetRequest } from "./UseGetRequest";

type TResponse = {
  readonly data?: TRentalRequestShowResponse;
  readonly error: Error | null;
};
type TRentalRequestShowResponse = {
  id: number;
  coordinateChoices: TCoordinateChoice[];
  height: number;
  weight: number;
  bmi: number;
  topsSize: string;
  bottomsSize: string;
  shoulder: string;
  bust: string;
  hip: string;
  freeText: string | null;
  referenceJacketSize: number;
  referenceJacketDropSize: number;
  referenceShoulderSize: number;
  referenceBustSize: number;
  referenceWaistSize: number;
  referenceLengthArm: number;
  referenceHipSize: number;
  referenceRoundLegSize: number;
  referenceRoundCalfSize: number;
  referenceLengthBodySize: number;
  referenceLengthLegSize: number;
};

type TCoordinateChoice = {
  id: number;
  name: string;
  preferenceChoice: number;
};

type TArgs = {
  readonly rentalId: number;
};
export const useRentalRequestShow = ({ rentalId }: TArgs): TResponse => {
  const { data, error } = useGetRequest<TRentalRequestShowResponse>(
    `rentals/${rentalId}/rental_request`,
  );
  return {
    data,
    error,
  };
};
