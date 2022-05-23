import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ItemCategoryNg } from "../../model/api/request/styling/ng/ItemCategoryNg";
import { SizeNg } from "../../model/api/request/styling/ng/SizeNg";
import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";
import { SizeNgDetailForm } from "./SizeNgDetailForm";

type TProps = {
  readonly ngCategoryId?: number;
  readonly ngData: NgNewResponse;
  readonly sizeNg?: SizeNg;
  readonly itemCategoryNg?: ItemCategoryNg;
  readonly onSizeNgChanged: (sizeNg: SizeNg) => void;
  readonly onCategoryNgChanged: (itemCategoryNg: ItemCategoryNg) => void;
};

export const NgDetailForm = ({
  ngCategoryId,
  ngData,
  sizeNg,
  itemCategoryNg,
  onSizeNgChanged,
  onCategoryNgChanged,
}: TProps) => {
  const SIZE_NG = 1;
  const ITEM_CATEGORY_NG = 2;
  const ngFormContents = () => {
    switch (ngCategoryId) {
      case SIZE_NG:
        return (
          <SizeNgDetailForm
            ngData={ngData}
            sizeNg={sizeNg}
            onSizeNgChanged={onSizeNgChanged}
          />
        );
      case ITEM_CATEGORY_NG:
    }
  };
  return (
    <>
      {ngFormContents}
      <Box
        sx={{
          width: 400,
          marginBottom: 4,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography align="left">特記事項</Typography>
        <TextField label="特記事項" multiline rows={4} style={{ width: 400 }} />
      </Box>
    </>
  );
};
