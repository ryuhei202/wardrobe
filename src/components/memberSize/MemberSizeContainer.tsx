import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMemberSizesUpdate } from "../../hooks/api/UseMemberSizesUpdate";
import { MemberSizeShowResponse } from "../../model/api/response/styling/member_size/MemberSizeShowResponse";
import { MemberSizeSizeChoiceResponse } from "../../model/api/response/styling/member_size/MemberSizeSizeChoiceResponse";
import { convertResToMemberSizes } from "../../model/memberSize/convertResToMemberSizes";
import {
  TMemberBasicSizes,
  TMemberPartSizes,
  TMemberSizes,
} from "../../model/memberSize/MemberSizeTypes";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";

import { MemberBasicSize } from "./MemberBasicSize";
import { MemberSize } from "./MemberSize";
import { memberSizeContainerHandler } from "./MemberSizeContainerHandler";
import { MemberSizeTable } from "./MemberSizeTable";

type TProps = {
  style?: React.CSSProperties;
  memberSizeResponse: MemberSizeShowResponse;
  sizeChoiceResponse: MemberSizeSizeChoiceResponse;
};

export const MemberSizeContainer = ({
  style,
  memberSizeResponse,
  sizeChoiceResponse,
}: TProps) => {
  const [fetchedSizes, setFetchedSizes] = useState<TMemberSizes>(
    convertResToMemberSizes(memberSizeResponse)
  );

  const [editingSizes, setEditingSizes] = useState<TMemberSizes>(
    convertResToMemberSizes(memberSizeResponse)
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
