import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { ChartId } from "../../../ChartId";
import { useGetConfirmRequest } from "../../../api/request/styling/browse/UseGetConfirmRequest";
import { ConfirmResponse } from "../../../api/response/styling/browse/ConfirmResponse";

export interface GetConfirmCaller {
  isRunning: () => boolean;
  response: ConfirmResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetConfirmCaller = (itemIds: number[]): GetConfirmCaller => {
  const [response, setResponse] = useState<ConfirmResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetConfirmRequest(ChartId(), itemIds);
  const client = useGetClient<ConfirmResponse>(request);

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
