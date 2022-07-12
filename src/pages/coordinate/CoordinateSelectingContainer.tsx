import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useMembersShow } from "../../hooks/api/UseMembersShow";
import {
  CoordinateIdContext,
  MemberIdContext,
  MemberShowContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { Selecting } from "./Selecting";
import { useCoordinateItemsIndex } from "../../hooks/api/UseCoordinateItemsIndex";
import { useCoordinatesShow } from "../../hooks/api/UseCoordinatesShow";
import { useCoordinateFootwearsShow } from "../../hooks/api/UseCoordinateFootwearsShow";

export const CoordinateSelectingContainer = () => {
  const memberId = useContextDefinedState(MemberIdContext);
  const coordinateId = useContextDefinedState(CoordinateIdContext);

  const { state: memberShowState, setter: setMemberShowContext } =
    useContext(MemberShowContext);
  const memberShowRes = useMembersShow({
    memberId,
  });
  const { data: coordinatesShowData, error: coordinatesShowError } =
    useCoordinatesShow(coordinateId);
  const { data: coordinateItemsIndexData, error: coordinateItemsIndexError } =
    useCoordinateItemsIndex({ coordinateId });

  const {
    data: coordinateFootwearShowData,
    error: coordinateFootwearsShowError,
  } = useCoordinateFootwearsShow();

  useEffect(() => {
    if (
      memberShowState === null ||
      memberShowRes.data?.id !== memberShowState?.data?.id
    ) {
      setMemberShowContext(memberShowRes);
    }
  }, [memberShowRes, memberShowState, setMemberShowContext]);

  if (coordinateItemsIndexError)
    return (
      <Typography sx={{ m: "auto" }}>
        {coordinateItemsIndexError.message}
      </Typography>
    );
  if (coordinatesShowError)
    return (
      <Typography sx={{ m: "auto" }}>{coordinatesShowError.message}</Typography>
    );
  if (coordinateFootwearsShowError)
    return (
      <Typography sx={{ m: "auto" }}>
        {coordinateFootwearsShowError.message}
      </Typography>
    );

  if (
    !coordinatesShowData ||
    !memberShowState ||
    !coordinateItemsIndexData ||
    !coordinateFootwearShowData
  )
    return <CircularProgress sx={{ m: "auto" }} />;

  return (
    <Selecting
      defaultItemNum={coordinatesShowData.coordinate.defaultItemNum}
      coordinateItemsIndexResponse={coordinateItemsIndexData}
      coordinateFootwearShowData={coordinateFootwearShowData}
    />
  );
};
