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
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import {
  ChartIdContext,
  MemberIdContext,
} from "../../components/context/provider/ContextProvider";
import { Coordinate } from "../../components/coordinate/Coordinate";
import { PlanTag } from "../../components/shared/PlanTag";
import { theme } from "../../components/style/Theme";
import { useKartesUpdate } from "../../hooks/api/UseKartesUpdate";
import { TCoordinate } from "../../model/api/response/styling/coordinate/TCoordinate";
import { TPlan } from "../../model/api/response/styling/karte/TPlan";

type TProps = {
  coordinates: TCoordinate[];
  hearingCompleted: boolean;
  isLeeapPlan: boolean;
  plan: TPlan;
  isSelectableBRank: boolean;
};

export const ChartMainContents = ({
  coordinates,
  hearingCompleted,
  isLeeapPlan,
  plan,
  isSelectableBRank,
}: TProps) => {
  const memberId = useContextDefinedState(MemberIdContext);
  const chartId = useContextDefinedState(ChartIdContext);
  const [selectedCoordinateIndex, setSelectedCoordinateIndex] = useState(0);
  const [currentHearingCompleted, setCurrentHearingCompleted] =
    useState(hearingCompleted);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackBarText, setSnackBarText] = useState("");
  const { mutate, isLoading } = useKartesUpdate({ chartId });

  if (coordinates.length === 0)
    return <Alert severity="error">コーデ情報が存在しません</Alert>;

  return (
    <Box>
      <div style={{ marginTop: theme.spacing(2) }}>
        <PlanTag
          color={isLeeapPlan ? "leeap" : "uwear"}
          name={`${plan.name}${isSelectableBRank ? "(Bランク可)" : ""}`}
        />
      </div>
      {isLeeapPlan && (
        <FormControlLabel
          value="end"
          style={{ marginTop: theme.spacing(1), marginLeft: theme.spacing(1) }}
          control={
            <Switch
              disabled={isLoading}
              checked={currentHearingCompleted}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                mutate(
                  { hearingCompleted: event.target.checked },
                  {
                    onSuccess: () => {
                      setCurrentHearingCompleted((prev) => !prev);
                      setSeverity("success");
                      setSnackBarText("ヒアリング状態を保存しました");
                    },
                    onError: () => {
                      setSeverity("error");
                      setSnackBarText("ヒアリング状態の保存に失敗しました");
                    },
                    onSettled: () => {
                      setIsSnackBarOpen(true);
                    },
                  },
                );
              }}
              size="small"
            />
          }
          label={
            <Typography variant="subtitle2" fontWeight="bold">
              {currentHearingCompleted
                ? "ヒアリング完了済み"
                : "ヒアリング未完了"}
            </Typography>
          }
          labelPlacement="end"
        />
      )}
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
        defaultItemNum={coordinates[selectedCoordinateIndex].defaultItemNum}
        isLeeapPlan={isLeeapPlan}
        isEditable
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
