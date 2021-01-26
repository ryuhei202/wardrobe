import { CallStatus } from "../../../api/shared/CallStatus";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import BrowseIndexResponse from "../../../api/response/styling/browse/BrowseIndexResponse";
import { ChartId } from "../../../ChartId";
import { usePostFeedbackRequest } from "../../../api/request/styling/feedback/UsePostFeedbackRequest";
import { usePostClient } from "../../../api/client/UsePostClient";

export interface PostFeedbackCaller {
  isRunning: () => boolean;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
  prepare: () => void;
  clearErrorResponse: () => void;
}

export const usePostFeedbackCaller = (
  category: number,
  description: string,
  itemIds: number[],
  onSuccess: () => void
): PostFeedbackCaller => {
  const [response, setResponse] = useState<any>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = usePostFeedbackRequest(
    ChartId(),
    category,
    description,
    itemIds
  );
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
