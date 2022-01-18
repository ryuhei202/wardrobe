import { CallStatus } from "../../../api/shared/CallStatus";
import { useGetClient } from "../../../api/client/UseGetClient";
import { useContext, useEffect, useState } from "react";
import { ErrorResponse } from "../../../api/response/shared/ErrorResponse";
import { AdviceChoiceResponse } from "../../../api/response/styling/arrange/AdviceChoiceResponse";
import { useGetAdviceChoiceRequest } from "../../../api/request/styling/arrange/UseGetAdviceChoiceRequest";
import { ChartIdContext } from "../../../../contexts/ChartIdContext";

export interface GetAdviceChoiceCaller {
  isRunning: () => boolean;
  response: AdviceChoiceResponse | null;
  errorResponse: ErrorResponse | null;
}

export const useGetAdviceChoiceCaller = (): GetAdviceChoiceCaller => {
  const chartId = useContext(ChartIdContext);
  const [response, setResponse] = useState<AdviceChoiceResponse | null>(null);
  const [callStatus, setCallStatus] = useState(CallStatus.Preparing);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(
    null
  );
  const request = useGetAdviceChoiceRequest(chartId ?? 0);
  const client = useGetClient<AdviceChoiceResponse>(request);

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
