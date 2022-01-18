import { CallStatus } from "../../../api/shared/CallStatus";
import { useContext, useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { BrowseIndexResponse } from "../../../api/response/styling/browse/BrowseIndexResponse";
import { usePostClient } from "../../../api/client/UsePostClient";
import { usePostSelectRequest } from "../../../api/request/styling/browse/UsePostSelectRequest";
import { ChartIdContext } from "../../../../contexts/ChartIdContext";

export interface PostSelectCaller {
  isRunning: () => boolean;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
  clearErrorResponse: () => void;
}

export const usePostSelectCaller = (
  itemId: number,
  previousItemId: number | null,
  onSuccess: () => void
): PostSelectCaller => {
  const chartId = useContext(ChartIdContext);
  const [response, setResponse] = useState<any>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = usePostSelectRequest(chartId ?? 0, itemId, previousItemId);
  const client = usePostClient(request);

  useEffect(() => {
    if (callStatus === CallStatus.Preparing) {
      const fetch = () => {
        client
          .post()
          .then((response) => {
            setResponse(response);
            setErrorResponse(null);
            setCallStatus(CallStatus.Idle);
            onSuccess();
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
