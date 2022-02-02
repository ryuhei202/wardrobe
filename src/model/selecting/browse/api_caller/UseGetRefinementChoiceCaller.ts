import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useContext, useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { BrowseRefinementChoiceResponse } from "../../../api/response/styling/browse/BrowseRefinementChoiceResponse";
import { useGetRefinementChoiceRequest } from "../../../api/request/styling/browse/UseGetRefinementChoiceRequest";
import { ChartIdContext } from "../../../../contexts/ChartIdContext";

export interface GetRefinementChoiceCaller {
  isRunning: () => boolean;
  response: BrowseRefinementChoiceResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetRefinementChoiceCaller = (
  categoryId: number
): GetRefinementChoiceCaller => {
  const chartId = useContext(ChartIdContext);
  const [
    response,
    setResponse,
  ] = useState<BrowseRefinementChoiceResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  useEffect(() => {
    setCallStatus(CallStatus.Preparing);
  }, [categoryId]);

  const request = useGetRefinementChoiceRequest(chartId ?? 0, categoryId);
  const client = useGetClient<BrowseRefinementChoiceResponse>(request);

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
