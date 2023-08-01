import ArticleIcon from "@mui/icons-material/Article";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChartIdContext,
  MemberIdContext,
} from "../context/provider/ContextProvider";

export const ChartShowButton = () => {
  const { pathname } = useLocation();
  const memberId = useContext(MemberIdContext).state;
  const chartId = useContext(ChartIdContext).state;

  return (
    <div style={{ flexGrow: 1 }}>
      {!pathname.startsWith("/rentals") && (
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
      )}
    </div>
  );
};
