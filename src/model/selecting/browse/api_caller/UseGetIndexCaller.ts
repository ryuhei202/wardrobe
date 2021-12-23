import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { Refinement } from "../Refinement";
import { BrowseIndexResponse } from "../../../api/response/styling/browse/BrowseIndexResponse";
import { useGetIndexRequest } from "../../../api/request/styling/browse/UseGetIndexRequest";
import { ChartId } from "../../../ChartId";

export interface GetIndexCaller {
  isRunning: () => boolean;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetIndexCaller = (refinement: Refinement): GetIndexCaller => {
  const [response, setResponse] = useState<BrowseIndexResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );

  useEffect(() => {
    setCallStatus(CallStatus.Preparing);
  }, [refinement]);

  const request = useGetIndexRequest(ChartId(), refinement);
  const client = useGetClient<BrowseIndexResponse>(request);

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
