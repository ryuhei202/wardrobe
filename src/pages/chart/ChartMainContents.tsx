import { Checkroom } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChartIdContext,
  MemberIdContext,
} from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { Coordinate } from "../../components/coordinate/Coordinate";
import { theme } from "../../components/style/Theme";
import { useMemberMemoUpdate } from "../../hooks/api/UseMemberMemoUpdate";
import { TCoordinate } from "../../model/api/response/styling/coordinate/TCoordinate";
import {
  NEXT_COORDE_HEARING,
  TNextCoordeHearing,
} from "../../model/api/response/styling/member_memo/NextCoordeHearing";

type TProps = {
  coordinates: TCoordinate[];
  nextCoordeHearing: TNextCoordeHearing;
};

export const ChartMainContents = ({
  coordinates,
  nextCoordeHearing,
}: TProps) => {
  const memberId = useContextDefinedState(MemberIdContext);
  const chartId = useContextDefinedState(ChartIdContext);
  const [selectedCoordinateIndex, setSelectedCoordinateIndex] = useState(0);
  const [currentNextCoordeHearing, setCurrentNextCoordeHearing] =
    useState(nextCoordeHearing);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useMemberMemoUpdate(
    useContextDefinedState(MemberIdContext)
  );

  if (coordinates.length === 0)
    return <Alert severity="error">コーデ情報が存在しません</Alert>;

  return (
    <Box>
      <FormControlLabel
        value="end"
        style={{ marginTop: theme.spacing(2), marginLeft: theme.spacing(1) }}
        control={
          <Switch
            disabled={isLoading}
            checked={!!currentNextCoordeHearing}
            onChange={() => {
              mutate(
                {
                  nextCoordeHearing: !!currentNextCoordeHearing
                    ? NEXT_COORDE_HEARING.HEARING
                    : NEXT_COORDE_HEARING.HEARING_END,
                },
                {
                  onSuccess: () => {
                    setSeverity("success");
                    setSnackBarText("ヒアリング状態を保存しました");
                  },
                  onError: () => {
                    setSeverity("error");
                    setSnackBarText("ヒアリング状態の保存に失敗しました");
                  },
                  onSettled: () => {
                    setCurrentNextCoordeHearing(
                      !!currentNextCoordeHearing
                        ? NEXT_COORDE_HEARING.HEARING
                        : NEXT_COORDE_HEARING.HEARING_END
                    );
                    setIsSnackBarOpen(true);
                  },
                }
              );
            }}
            size="small"
          />
        }
        label={
          <Typography variant="subtitle2" fontWeight="bold">
            {nextCoordeHearing
              ? "次回ヒアリング完了済み"
              : "次回ヒアリング未完了"}
          </Typography>
        }
        labelPlacement="end"
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedCoordinateIndex}
          onChange={(_, newValue) => setSelectedCoordinateIndex(newValue)}
        >
          {coordinates.map((_, index) => (
            <Tab
              label={`コーデ${index + 1}`}
              id={`coordinate-tab-${index}`}
              key={index}
            />
          ))}
        </Tabs>
      </Box>
      <Link
        to={{
          pathname: "/coordinate",
          search: `?memberId=${memberId}&chartId=${chartId}&coordinateId=${coordinates[selectedCoordinateIndex].id}`,
        }}
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          startIcon={<Checkroom />}
          sx={{ marginTop: "1em" }}
        >
          <Typography>コーデ作成</Typography>
        </Button>
      </Link>
      <Coordinate
        coordinateId={coordinates[selectedCoordinateIndex].id}
        key={coordinates[selectedCoordinateIndex].id}
      />
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </Box>
  );
};
