import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import DetailResponse from "../../../api/response/styling/browse/DetailResponse";
import { useGetDetailRequest } from "../../../api/request/styling/browse/UseGetDetailRequest";
import { ChartId } from "../../../ChartId";

export interface GetDetailCaller {
  isRunning: () => boolean;
  response: DetailResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetDetailCaller = (
  preregisteredItemId: number
): GetDetailCaller => {
  const [response, setResponse] = useState<DetailResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetDetailRequest(ChartId(), preregisteredItemId);
  const client = useGetClient<DetailResponse>(request);

  useEffect(() => {
    setCallStatus(CallStatus.Preparing);
  }, [preregisteredItemId]);

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
