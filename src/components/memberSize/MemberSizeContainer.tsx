import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMemberSizesUpdate } from "../../hooks/api/UseMemberSizesUpdate";
import { MemberSizeShowResponse } from "../../model/api/response/styling/member_size/MemberSizeShowResponse";
import { MemberSizeSizeChoiceResponse } from "../../model/api/response/styling/member_size/MemberSizeSizeChoiceResponse";
import {
  TMemberBasicSizes,
  TMemberPartSizes,
  TMemberSizes,
} from "../../model/memberSize/MemberSizeTypes";
import { convertResToMemberSizes } from "../../model/memberSize/convertResToMemberSizes";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import {
  ChartIdContext,
  MemberIdContext,
} from "../context/provider/ContextProvider";

import { MemberBasicSize } from "./MemberBasicSize";
import { MemberBodyShape } from "./MemberBodyShape";
import { MemberSize } from "./MemberSize";
import { memberSizeContainerHandler } from "./MemberSizeContainerHandler";
import { MemberSizeTable } from "./MemberSizeTable";

type TProps = {
  style?: React.CSSProperties;
  memberSizeResponse: MemberSizeShowResponse;
  sizeChoiceResponse: MemberSizeSizeChoiceResponse;
  aboutSize: string | null;
};

export const MemberSizeContainer = ({
  style,
  memberSizeResponse,
  sizeChoiceResponse,
  aboutSize,
}: TProps) => {
  const [fetchedSizes, setFetchedSizes] = useState<TMemberSizes>(
    convertResToMemberSizes(memberSizeResponse),
  );
  const chartId = useContextDefinedState(ChartIdContext);

  const [editingSizes, setEditingSizes] = useState<TMemberSizes>(
    convertResToMemberSizes(memberSizeResponse),
  );

  const [snackBarState, setSnackBarState] = useState<{
    isOpen: boolean;
    severity: "success" | "error";
    text: string;
  }>({
    isOpen: false,
    severity: "success",
    text: "",
  });

  const setEditingBasicSizes = (v: TMemberBasicSizes) => {
    setEditingSizes({ ...editingSizes, basicSizes: v });
  };

  const setEditingPartSizes = (v: TMemberPartSizes) => {
    setEditingSizes({ ...editingSizes, partSizes: v });
  };

  const { mutate: mutateSizes, isLoading: isLoadingMutateSizes } =
    useMemberSizesUpdate({
      memberId: useContextDefinedState(MemberIdContext),
    });

  const isChangedSizes =
    JSON.stringify(editingSizes) !== JSON.stringify(fetchedSizes);

  const handler = memberSizeContainerHandler({
    fetchedSizes,
    editingSizes,
    mutateSizes,
    isChangedSizes,
    setSnackBarState,
    chartId,
  });

  useEffect(() => {
    const memberSizes = convertResToMemberSizes(memberSizeResponse);
    setFetchedSizes(memberSizes);
    setEditingSizes(memberSizes);
  }, [memberSizeResponse]);

  return (
    <>
      <div style={style}>
        <MemberSize
          basicSizeComponent={
            <MemberBasicSize
              editingSizes={editingSizes.basicSizes}
              fetchedSizes={fetchedSizes.basicSizes}
              sizeChoiceResponse={sizeChoiceResponse}
              onChangeEditingSizes={setEditingBasicSizes}
              onSubmit={handler.handleSubmit}
            />
          }
          partSizeComponent={
            <MemberSizeTable
              editingSizes={editingSizes.partSizes}
              fetchedSizes={fetchedSizes.partSizes}
              onChangeEditingSizes={setEditingPartSizes}
              onSubmit={handler.handleSubmit}
            />
          }
          onClickSubmitBtn={handler.handleSubmit}
          shouldActiveSubmitBtn={isChangedSizes}
          isLoadingSubmit={isLoadingMutateSizes}
          aboutSize={aboutSize}
          bodyShapeComponent={
            <MemberBodyShape
              bust={memberSizeResponse.choices.bust}
              shapeWaist={memberSizeResponse.choices.shapeWaist}
              shoulder={memberSizeResponse.choices.shoulder}
              hip={memberSizeResponse.choices.hip}
            />
          }
        />
      </div>
      <Snackbar
        open={snackBarState.isOpen}
        autoHideDuration={5000}
        onClose={() => setSnackBarState({ ...snackBarState, isOpen: false })}
      >
        <Alert severity={snackBarState.severity}>{snackBarState.text}</Alert>
      </Snackbar>
    </>
  );
};
