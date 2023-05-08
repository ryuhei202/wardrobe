import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useCoordinateDescriptionsUpdate } from "../../hooks/api/UseCoordinateDescriptionsUpdate";
import { useSimplifiedHearingsShow } from "../../hooks/api/UseSimplifiedHearingsShow";
import { CoordinateDescriptionsShowResponse } from "../../model/api/response/styling/coordinateDescription/CoordinateDescriptionsShowResponse";
import { TCoordinateItem } from "../../model/coordinateItem/TCoordinateItem";
import { alertClosedWindow } from "../../service/shared/alertClosedWindow";
import { MemoForm } from "../shared/MemoForm";
import { CoordinateDescriptionLineSendButton } from "./CoordinateDescriptionLineSendButton";

type TProps = {
  readonly data: CoordinateDescriptionsShowResponse;
  readonly coordinateId: number;
  readonly coordinateItems: TCoordinateItem[];
  readonly isLineMessagesSendDisable: boolean;
  readonly isOneShot: boolean;
  readonly onUpdateComplete: () => Promise<any>;
};

export const CoordinateDescription = ({
  data,
  coordinateId,
  coordinateItems,
  isLineMessagesSendDisable,
  isOneShot,
  onUpdateComplete,
}: TProps) => {
  const [text, setText] = useState(data.text ?? "");
  const { mutate, isLoading } = useCoordinateDescriptionsUpdate({
    coordinateId,
  });
  const { data: simplifiedHearingData } = useSimplifiedHearingsShow({
    coordinateId,
  });
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const onChange = (value: string) => {
    setText(value);
    setIsTextChanged(data.text === null ? value !== "" : value !== data.text);
  };
  const onPost = () => {
    mutate(
      { text },
      {
        onSuccess: () => {
          onUpdateComplete().then(() => {
            setSeverity("success");
            setSnackBarText("根拠説明の変更を保存しました");
          });
        },
        onError: () => {
          setSeverity("error");
          setSnackBarText("根拠説明の変更に失敗しました");
        },
        onSettled: () => {
          setIsSnackBarOpen(true);
        },
      }
    );
  };

  useEffect(() => {
    alertClosedWindow(!isTextChanged);
  }, [isTextChanged]);

  return (
    <>
      <MemoForm
        value={text}
        rows={14}
        onChange={onChange}
        onPost={onPost}
        disabled={!isTextChanged || isLoading}
      />
      {isOneShot && (
        <CoordinateDescriptionLineSendButton
          descriptionText={text}
          coordinateItems={coordinateItems}
          disabled={isLineMessagesSendDisable || isTextChanged || text === ""}
          simplifiedHearing={simplifiedHearingData}
        />
      )}
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
