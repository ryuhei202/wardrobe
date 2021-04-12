import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useEffect, useState } from "react";
import ErrorResponse from "../../../api/response/shared/ErrorResponse";
import CategoryChoiceResponse from "../../../api/response/styling/browse/CategoryChoiceResponse";
import { useGetCategoryChoiceRequest } from "../../../api/request/styling/browse/UseGetCategoryChoiceRequest";

export interface GetCategoryChoiceCaller {
  isRunning: () => boolean;
  response: CategoryChoiceResponse[] | null;
  errorResponse: ErrorResponse | null;
}

export const useGetCategoryChoiceCaller = (): GetCategoryChoiceCaller => {
  const [response, setResponse] = useState<CategoryChoiceResponse[] | null>(
    null
  );
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetCategoryChoiceRequest();
  const client = useGetClient<CategoryChoiceResponse[]>(request);

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
