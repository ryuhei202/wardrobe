import { Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ChartIdContext,
  MemberIdContext,
} from "../context/provider/ContextProvider";
import { useAppStyle } from "../style/UseAppStyle";

export const ChartShowButton = () => {
  const classes = useAppStyle();
  const memberId = useContext(MemberIdContext).state;
  const chartId = useContext(ChartIdContext).state;

  return (
    <div className={classes.chartShowButton}>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        component={Link}
        to={{
          pathname: "/chart",
          search: `?memberId=${memberId}&chartId=${chartId}`,
        }}
        startIcon={<ArticleIcon />}
        sx={{ fontWeight: "bold" }}
      >
        カルテ
      </Button>
    </div>
  );
};
