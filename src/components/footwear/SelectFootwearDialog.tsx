import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TFootwearsIndexResponse } from "../../model/api/response/styling/footwear/TFootwearsIndexResponse";
import { HostUrl } from "../../model/HostUrl";

type TProps = {
  readonly footwearIndexData: TFootwearsIndexResponse;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onClick: (footwearId: number) => void;
};
export const SelectFootwearDialog = ({
  footwearIndexData,
  isOpen,
  onClose,
  onClick,
}: TProps) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
        <DialogTitle>靴を選択</DialogTitle>
        <div
          style={{
            width: 1200,
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            margin: 5,
            height: "min-content",
          }}
        >
          {footwearIndexData.footwears.map((footwear) => (
            <Card sx={{ maxWidth: 150, margin: 1 }}>
              <CardActionArea onClick={() => onClick(footwear.id)}>
                {/* <CardMedia component="img"
                style={{ width: 150, height: 150 }}
                  image={`${HostUrl()}/images/footwear/${footwear.id}.jpg`}
                /> */}
                <CardMedia
                  component="img"
                  style={{ width: 150, height: 150 }}
                  image={`http://localhost:3000/images/color/3.jpg`}
                />
                <CardContent>
                  <Typography variant="body1">{footwear.name}</Typography>
                  <Typography variant="body2">
                    キレイ度: {footwear.formalRank}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Dialog>
    </>
  );
};
