import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useChartHearingStatusUpdate } from "../../hooks/api/UseChartHearingStatusUpdate";
import { NextStatuses } from "../../model/api/response/styling/coordinateHearingStatus/NextStatuses";

type TProps = {
  currentStatus: string;
  nextStatuses: NextStatuses;
  chartId: number;
};

export const ChartHearingStatus = ({
  currentStatus,
  nextStatuses,
  chartId,
}: TProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useChartHearingStatusUpdate(chartId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    ["提案済み", "修正待ち"].includes(currentStatus) &&
      setAnchorEl(event.currentTarget);
  };
  const handleClickChangeStatus = (chartId: number, nextStatusId: number) => {
    handleClose();
    mutate(
      { status: nextStatusId },
      {
        onError: (error) => {
          alert(error.message);
        },
        onSuccess: () => {
          queryClient.invalidateQueries(`${chartId}/chart_hearing_status`);
        },
      },
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const displayBackgroundColor = (currentStatus: string) => {
    switch (currentStatus) {
      case "確認中":
        return "secondary";
      case "作成待ち":
      case "修正待ち":
        return "primary";
      case "提案済み":
        return "info";
      default:
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
