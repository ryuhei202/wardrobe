import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { ItemCategoryNg } from "../../model/api/request/styling/ng/ItemCategoryNg";
import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";

type TProps = {
  readonly ngData: NgNewResponse;
  readonly itemCategoryNg: ItemCategoryNg;
  readonly onCategoryNgChanged: (itemCategoryNg: ItemCategoryNg) => void;
};

export const CategoryNgDetailForm = ({
  ngData,
  itemCategoryNg,
  onCategoryNgChanged,
}: TProps) => (
  <>
    <Box
      sx={{
        width: 400,
        marginBottom: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography align="left">中カテゴリ一覧</Typography>
      <FormControl>
        <InputLabel>中カテゴリ一覧</InputLabel>
        <Select
          style={{ width: 400 }}
          onChange={(event) =>
            onCategoryNgChanged({
              ...itemCategoryNg,
              cateMediumId: event.target.value as number,
              cateSmallId: undefined,
            })
          }
        >
          {ngData.itemMediumCategories?.map((mediumCategory) => (
            <MenuItem value={mediumCategory.id}>{mediumCategory.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box
      sx={{
        width: 400,
        marginBottom: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography align="left">小カテゴリ一覧</Typography>
      <FormControl>
        <InputLabel>小カテゴリ一覧</InputLabel>
        <Select
          style={{ width: 400 }}
          onChange={(event) =>
            onCategoryNgChanged({
              ...itemCategoryNg,
              cateSmallId: event.target.value as number,
            })
          }
        >
          {ngData.itemMediumCategories
            ?.find((c) => c.id === itemCategoryNg.cateMediumId)
            ?.itemSmallCategories?.map((smallCategory) => (
              <MenuItem value={smallCategory.id}>{smallCategory.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
    <Box
      sx={{
        width: 400,
        marginBottom: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography align="left">ジャケパンプランのみ</Typography>
      <Switch
        checked={itemCategoryNg.isOnlyJacketPlan}
        onChange={(event) =>
          onCategoryNgChanged({
            ...itemCategoryNg,
            isOnlyJacketPlan: event.target.checked,
          })
        }
      />
    </Box>
  </>
);
