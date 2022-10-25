import { CircularProgress, Typography } from "@mui/material";
import { useDeliveryDatesShow } from "../../hooks/api/UseDeliveryDatesShow";
import {
  ChartIdContext,
  MemberShowContext,
} from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { Member } from "./Member";

export const MemberContainer = () => {
  const memberShow = useContextDefinedState(MemberShowContext);
  const chartId = useContextDefinedState(ChartIdContext);
  const { data: deliveryDateData, error: deliveryDateError } =
    useDeliveryDatesShow({
      chartId,
    });

  if (!(memberShow.data && deliveryDateData)) return <CircularProgress />;
  if (memberShow.error)
    return <Typography>{memberShow.error.message}</Typography>;

  if (deliveryDateError)
    return <Typography>{deliveryDateError.message}</Typography>;

  return (
    <Member response={memberShow.data} deliveryDateData={deliveryDateData} />
  );
};
