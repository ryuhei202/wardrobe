import { Button, Menu } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useContext, useState } from "react";

import { useAppStyle } from "../style/UseAppStyle";
import {
  ChartIdContext,
  MemberIdContext,
} from "../context/provider/ContextProvider";
import { CoordinateMenuItem } from "./CoordinateMenuItem";

export const CoordinatesDropDownMenu = () => {
  const classes = useAppStyle();
  const memberId = useContext(MemberIdContext).state;
  const chartId = useContext(ChartIdContext).state;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.coordinatesDropDownMenu}>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<CheckroomIcon />}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ fontWeight: "bold" }}
      >
        コーデ
      </Button>
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {memberId !== null && chartId != null && (
          <CoordinateMenuItem
            memberId={memberId}
            chartId={chartId}
            onClick={handleClose}
          />
        )}
      </Menu>
    </div>
  );
};
