import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import Refinement from "../Refinement";
import BrowseIndexResponse from "../../../api/response/styling/browse/BrowseIndexResponse";
import { useGetIndexRequest } from "../../../api/request/styling/browse/UseGetIndexRequest";

export interface GetIndexCaller {
  isRunning: () => boolean;
  prepare: () => void;
  response: BrowseIndexResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetIndexCaller = (refinement: Refinement): GetIndexCaller => {
  const [response, setResponse] = useState<BrowseIndexResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Idle);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetIndexRequest(384763, refinement);
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

  const prepare = (): void => {
    setCallStatus(CallStatus.Preparing);
  };

  return { isRunning, prepare, response, errorResponse };
};
