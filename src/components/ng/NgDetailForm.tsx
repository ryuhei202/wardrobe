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
import { CategoryNgDetailForm } from "./CategoryNgDetailForm";
import { SizeNgDetailForm } from "./SizeNgDetailForm";

type TProps = {
  readonly ngCategoryId?: number;
  readonly ngData: NgNewResponse;
  readonly freeText: string;
  readonly sizeNg?: SizeNg;
  readonly itemCategoryNg?: ItemCategoryNg;
  readonly onSizeNgChanged: (sizeNg: SizeNg) => void;
  readonly onCategoryNgChanged: (itemCategoryNg: ItemCategoryNg) => void;
  readonly onTextChanged: (freeText: string) => void;
};

export const NgDetailForm = ({
  ngCategoryId,
  ngData,
  freeText,
  sizeNg,
  itemCategoryNg,
  onSizeNgChanged,
  onCategoryNgChanged,
  onTextChanged,
}: TProps) => {
  const SIZE_NG = 1;
  const ITEM_CATEGORY_NG = 2;

  let ngFormContents;
  switch (ngCategoryId) {
    case SIZE_NG:
      ngFormContents = (
        <SizeNgDetailForm
          ngData={ngData}
          sizeNg={sizeNg}
          onSizeNgChanged={onSizeNgChanged}
        />
      );
      break;
    case ITEM_CATEGORY_NG:
      ngFormContents = (
        <CategoryNgDetailForm
          ngData={ngData}
          itemCategoryNg={itemCategoryNg as ItemCategoryNg}
          onCategoryNgChanged={onCategoryNgChanged}
        />
      );
      break;
  }
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
        <TextField
          label="特記事項"
          multiline
          rows={4}
          style={{ width: 400 }}
          value={freeText}
          onChange={(event) => onTextChanged(event.target.value)}
        />
      </Box>
    </>
  );
};
