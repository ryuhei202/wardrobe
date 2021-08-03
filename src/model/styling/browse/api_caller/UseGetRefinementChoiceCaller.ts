import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import RefinementChoiceResponse from "../../../api/response/styling/browse/RefinementChoiceResponse";
import { useGetRefinementChoiceRequest } from "../../../api/request/styling/browse/UseGetRefinementChoiceRequest";
import { ChartId } from "../../../ChartId";

export interface GetRefinementChoiceCaller {
  isRunning: () => boolean;
  response: RefinementChoiceResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetRefinementChoiceCaller = (
  categoryId: number
): GetRefinementChoiceCaller => {
  const [response, setResponse] = useState<RefinementChoiceResponse | null>(
    null
  );
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  useEffect(() => {
    setCallStatus(CallStatus.Preparing);
  }, [categoryId]);

  const request = useGetRefinementChoiceRequest(ChartId(), categoryId);
  const client = useGetClient<RefinementChoiceResponse>(request);

  useEffect(() => {
    if (callStatus === CallStatus.Preparing) {
      const fetch = () => {
        client
          .get()
          .then((response) => {
            setResponse(response);
            setErrorResponse(null);
            setCallStatus(CallStatus.Idle);
          })
          .catch((error: ErrorResponse) => {
            setErrorResponse(error);
            setCallStatus(CallStatus.Idle);
          });
      };
      setCallStatus(CallStatus.Running);
      fetch();
    }
  }, [callStatus, client]);

  const isRunning = (): boolean => {
    return callStatus === CallStatus.Running;
  };

  return { isRunning, response, errorResponse };
};
