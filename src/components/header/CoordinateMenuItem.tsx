import { CircularProgress, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCoordinatesIndex } from "../../hooks/api/UseCoordinatesIndex";

type TProps = {
  chartId: number;
  memberId: number;
  onClick: () => void;
};

export const CoordinateMenuItem = ({ chartId, memberId, onClick }: TProps) => {
  const { data, error } = useCoordinatesIndex({ chartId });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <>
      {data.coordinates.map((coordinate, index) => (
        <Link
          to={{
            pathname: "/coordinate",
            search: `?memberId=${memberId}&chartId=${chartId}&coordinateId=${coordinate.id}`,
          }}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <MenuItem onClick={onClick}>コーデ{index + 1}</MenuItem>
        </Link>
      ))}
    </>
  );
};
