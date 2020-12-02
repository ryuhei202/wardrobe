import { CallStatus } from "./../../../api/shared/CallStatus";
import { useGetClient } from "./../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import { useGetKarteRequest } from "../../../api/request/styling/karte/UseGetKarteRequest";
import KarteResponse from "../../../api/response/styling/karte/KarteResponse";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";

export interface GetKarteCaller {
  isRunning: () => boolean;
  response: KarteResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetKarteCaller = (): GetKarteCaller => {
  const [response, setResponse] = useState<KarteResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Prepareing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetKarteRequest(493782);
  const client = useGetClient<KarteResponse>(request);

  useEffect(() => {
    if (callStatus === CallStatus.Prepareing) {
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
