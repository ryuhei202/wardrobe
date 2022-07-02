import { Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ChartIdContext,
  MemberIdContext,
} from "../context/provider/ContextProvider";

export const ChartShowButton = () => {
  const memberId = useContext(MemberIdContext).state;
  const chartId = useContext(ChartIdContext).state;

  return (
    <>
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
    </>
  );
};
