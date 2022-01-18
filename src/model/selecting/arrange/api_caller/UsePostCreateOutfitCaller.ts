import { Outfit } from "../Outfit";
import { CallStatus } from "../../../api/shared/CallStatus";
import { useContext, useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { BrowseIndexResponse } from "../../../api/response/styling/browse/BrowseIndexResponse";
import { usePostClient } from "../../../api/client/UsePostClient";
import { usePostCreateOutfitRequest } from "../../../api/request/styling/arrange/UsePostCreateOutfitRequest";
import { ChartIdContext } from "../../../../contexts/ChartIdContext";

export interface PostCreateOutfitCaller {
  isRunning: () => boolean;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
  prepare: () => void;
  clearErrorResponse: () => void;
}

export const usePostCreateOutfitCaller = (
  outfits: Outfit[],
  onPostComplete: () => void
): PostCreateOutfitCaller => {
  const chartId = useContext(ChartIdContext);
  const [response, setResponse] = useState<any>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  const request = usePostCreateOutfitRequest(chartId ?? 0, outfits);
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
            onPostComplete();
          })
          .catch((error: ErrorResponse) => {
            setErrorResponse(error);
            setCallStatus(CallStatus.Idle);
          });
      };
      setCallStatus(CallStatus.Running);
      fetch();
    }
  }, [callStatus, client, onPostComplete]);

  const isRunning = (): boolean => {
    return callStatus === CallStatus.Running;
  };

  const prepare = () => {
    setErrorResponse(null);
    setCallStatus(CallStatus.Preparing);
  };

  const clearErrorResponse = () => {
    setErrorResponse(null);
  };

  return { isRunning, response, errorResponse, prepare, clearErrorResponse };
};
