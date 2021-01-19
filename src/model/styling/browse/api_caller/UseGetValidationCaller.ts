import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import { ChartId } from "../../../ChartId";
import ValidationResponse from "../../../api/response/styling/browse/ValidationResponse";
import { useGetValidationRequest } from "../../../api/request/styling/browse/UseGetValidationRequest";

export interface GetValidationCaller {
  isRunning: () => boolean;
  response: ValidationResponse[] | null;
  errorResponse: ErrorResponse | null;
  clearErrorResponse: () => void;
}

export const useGetValidationCaller = (
  itemId: number,
  onSuccess: (response: ValidationResponse[]) => void
): GetValidationCaller => {
  const [response, setResponse] = useState<ValidationResponse[] | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = useGetValidationRequest(ChartId(), itemId);
  const client = useGetClient<ValidationResponse[]>(request);

  useEffect(() => {
    if (callStatus === CallStatus.Preparing) {
      const fetch = () => {
        client
          .get()
          .then((response) => {
            setResponse(response);
            setErrorResponse(null);
            setCallStatus(CallStatus.Idle);
            onSuccess(response);
          })
          .catch((error: ErrorResponse) => {
            setErrorResponse(error);
            setCallStatus(CallStatus.Idle);
          });
      };
      setCallStatus(CallStatus.Running);
      fetch();
    }
  }, [callStatus, client, onSuccess]);

  const isRunning = (): boolean => {
    return callStatus === CallStatus.Running;
  };

  const clearErrorResponse = () => {
    setErrorResponse(null);
  };

  return { isRunning, response, errorResponse, clearErrorResponse };
};
