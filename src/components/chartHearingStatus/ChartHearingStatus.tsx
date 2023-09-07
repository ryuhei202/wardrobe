import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useKarteHearingStatusUpdate } from "../../hooks/api/UseKarteHearingStatusUpdate";
import { NextStatuses } from "../../model/api/response/styling/chartHearingStatus/NextStatuses";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { ChartIdContext } from "../context/provider/ContextProvider";

type TProps = {
  currentStatus: string;
  nextStatuses: NextStatuses;
};

export const ChartHearingStatus = ({ currentStatus, nextStatuses }: TProps) => {
  const chartId = useContextDefinedState(ChartIdContext);
  const queryClient = useQueryClient();
  const { mutate } = useKarteHearingStatusUpdate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    ["提案済み", "修正待ち"].includes(currentStatus) &&
      setAnchorEl(event.currentTarget);
  };
  const handleClickChangeStatus = (chartId: number, nextStatusId: number) => {
    handleClose();
    mutate(
      { karte_id: chartId, status: nextStatusId },
      {
        onError: (error) => {
          alert(error.message);
        },
        onSuccess: () => {
          queryClient.invalidateQueries(
            `styling/kartes/${chartId}/chart_hearing_status`,
          );
        },
      },
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const displayBackgroundColor = (currentStatus: string) => {
    if (currentStatus === "確認中") {
      return "secondary";
    }
    if (currentStatus === "作成待ち" || currentStatus === "修正待ち") {
      return "primary";
    } else {
      return "inherit";
    }
  };
  return (
    <Box pt={1.5}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color={displayBackgroundColor(currentStatus)}
        sx={{ borderRadius: 8 }}
      >
        {currentStatus}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {["提案済み", "修正待ち"].includes(currentStatus) &&
          nextStatuses.map((nextStatus) => (
            <MenuItem
              key={nextStatus.id}
              onClick={() => handleClickChangeStatus(chartId, nextStatus.id)}
            >
              {nextStatus.name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};
