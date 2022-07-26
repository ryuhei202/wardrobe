import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { CoordinateIdContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { ArrangePatternFetcher } from "./ArrangePatternFetcher";
import { ArrangeCallback } from "./callback/ArrangeCallback";

type TProps = {
  data: ArrangeData;
  callback: ArrangeCallback;
};

export const Arrange = ({ data, callback }: TProps) => {
  const coordinateId = useContextDefinedState(CoordinateIdContext);

  return (
    <>
      <IconButton onClick={() => callback.onClickBackButton()} size="large">
        <ArrowBack />
      </IconButton>
      <br />
      <Typography display="inline" variant="h6" paragraph>
        着こなしアドバイス
      </Typography>
      <ArrangePatternFetcher data={data} coordinateId={coordinateId} />
    </>
  );
};
