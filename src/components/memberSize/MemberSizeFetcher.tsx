import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemberSizesShow } from "../../hooks/api/UseMemberSizesShow";
import { useMemberSizesSizeChoice } from "../../hooks/api/UseMemberSizesSizeChoice";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";

import { MemberSizeContainer } from "./MemberSizeContainer";

type TProps = {
  style?: React.CSSProperties;
};

export const MemberSizeFetcher = ({ style }: TProps) => {
  const memberId = useContextDefinedState(MemberIdContext);
  const { data: memberSizeResponse, error: memberSizeError } =
    useMemberSizesShow({ memberId });

  const { data: sizeChoiceResponse, error: sizeChoiceError } =
    useMemberSizesSizeChoice({ memberId });

  if (memberSizeError || sizeChoiceError)
    return (
      <Typography>
        {memberSizeError?.message || sizeChoiceError?.message}
      </Typography>
    );

  if (!(memberSizeResponse && sizeChoiceResponse)) return <CircularProgress />;

  return (
    <MemberSizeContainer
      style={style}
      memberSizeResponse={memberSizeResponse}
      sizeChoiceResponse={sizeChoiceResponse}
    />
  );
};
