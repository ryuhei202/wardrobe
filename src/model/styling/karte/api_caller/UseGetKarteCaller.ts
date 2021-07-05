import { CallStatus } from "./../../../api/shared/CallStatus";
import { useGetClient } from "./../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import { useGetKarteRequest } from "../../../api/request/styling/karte/UseGetKarteRequest";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import { ChartId } from "../../../ChartId";
import SelectedItem from "../../SelectedItem";
import { KarteResponse } from "../../../api/response/styling/karte/KarteResponse";

interface GetKarteCaller {
  isRunning: () => boolean;
  response: KarteResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetKarteCaller = (
  onSuccess: (
    isItemRegistered: boolean,
    registeredItems: SelectedItem[],
    defaultItemNum: number
  ) => void
): GetKarteCaller => {
  const [response, setResponse] = useState<KarteResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetKarteRequest(ChartId());
  const client = useGetClient<KarteResponse>(request);

  useEffect(() => {
    if (callStatus === CallStatus.Preparing) {
      const fetch = () => {
        client
          .get()
          .then((response) => {
            setResponse(response);
            setErrorResponse(null);
            setCallStatus(CallStatus.Idle);
            if (response.registeredItems.length > 0) {
              onSuccess(
                true,
                response.registeredItems,
                response.defaultItemNum
              );
            } else {
              onSuccess(false, [], response.defaultItemNum);
            }
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

  return { isRunning, response, errorResponse };
};
