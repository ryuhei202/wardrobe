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
  const handleClick = ({ footwearId }: { footwearId: number }) => {
    onClick(footwearId);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>靴を選択</DialogTitle>
        <div style={{ width: 600, textAlign: "center" }}>
          {footwearIndexData.footwears.map((footwear) => (
            <Card>
              <CardActionArea
                onClick={() => handleClick({ footwearId: footwear.id })}
              >
                <CardMedia
                  image={`${HostUrl()}/images/footwear/${footwear.id}.jpg`}
                />
                <CardContent>
                  <Typography variant="body1">{footwear.name}</Typography>
                  <Typography variant="body2">{footwear.formalRank}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Dialog>
    </>
  );
};
