import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { useGetSearchPrerequisiteRequest } from "../../../api/request/styling/browse/UseGetSearchPrerequisiteRequest";
import { SearchPrerequisiteResponse } from "../../../api/response/styling/browse/SearchPrerequisiteResponse";

export interface GetCategoryChoiceCaller {
  isRunning: () => boolean;
  response: SearchPrerequisiteResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetCategoryChoiceCaller = (): GetCategoryChoiceCaller => {
  const [response, setResponse] = useState<SearchPrerequisiteResponse | null>(
    null
  );
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetSearchPrerequisiteRequest();
  const client = useGetClient<SearchPrerequisiteResponse>(request);

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
