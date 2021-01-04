import { Dialog, makeStyles } from "@material-ui/core";
import { useState } from "react";
import PopupImageData from "../../model/shared/props_data/PopupImageData";

interface PopupImageProps {
  data: PopupImageData;
}

const useStyles = makeStyles({
  originalImage: {
    top: "50%",
    position: "relative",
    transform: "translateY(-50%)",
  },
});

const PopupImage = (props: PopupImageProps) => {
  const classes = useStyles();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <img
        src={props.data.originalImageUrl}
        width="100%"
        height="auto"
        alt=""
        onClick={() => setIsPopupOpen(true)}
        className={classes.originalImage}
      />
      <Dialog
        maxWidth="lg"
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <img src={props.data.popupImageUrl} width="100%" height="auto" alt="" />
      </Dialog>
    </>
  );
};

export default PopupImage;
