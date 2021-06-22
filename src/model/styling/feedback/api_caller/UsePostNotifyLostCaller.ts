import { CallStatus } from "../../../api/shared/CallStatus";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import BrowseIndexResponse from "../../../api/response/styling/browse/BrowseIndexResponse";
import { usePostClient } from "../../../api/client/UsePostClient";
import { usePostNotifyLostRequest } from "../../../api/request/styling/feedback/UsePostNotifyLostRequest";

export interface PostNotifyLostCaller {
  isRunning: () => boolean;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
  prepare: () => void;
  clearErrorResponse: () => void;
}

export const usePostNotifyLostCaller = (
  itemIds: number[],
  onSuccess: () => void
): PostNotifyLostCaller => {
  const [response, setResponse] = useState<any>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = usePostNotifyLostRequest(itemIds);
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

  const prepare = () => {
    setCallStatus(CallStatus.Preparing);
  };

  const clearErrorResponse = () => {
    setErrorResponse(null);
  };

  return { isRunning, response, errorResponse, prepare, clearErrorResponse };
};
