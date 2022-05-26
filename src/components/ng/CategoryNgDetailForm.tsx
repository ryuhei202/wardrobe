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
      <Typography align="left" style={{ paddingBottom: 5 }}>
        中カテゴリー一覧
      </Typography>
      <FormControl error={itemCategoryNg?.cateMediumId === undefined}>
        <InputLabel>
          {itemCategoryNg?.cateMediumId === undefined ? "必須" : ""}
        </InputLabel>
        <Select
          style={{ width: 400 }}
          value={itemCategoryNg?.cateMediumId ?? ""}
          onChange={(event) =>
            onCategoryNgChanged({
              ...itemCategoryNg,
              cateMediumId: event.target.value as number | undefined,
              cateSmallId: undefined,
            })
          }
        >
          <MenuItem value={undefined}></MenuItem>
          {ngData.itemMediumCategories?.map((mediumCategory) => (
            <MenuItem key={mediumCategory.id} value={mediumCategory.id}>
              {mediumCategory.name}
            </MenuItem>
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
      <Typography align="left" style={{ paddingBottom: 5 }}>
        小カテゴリー一覧
      </Typography>
      <FormControl>
        <InputLabel>
          {itemCategoryNg?.cateSmallId === undefined ? "任意" : ""}
        </InputLabel>
        <Select
          style={{ width: 400 }}
          value={itemCategoryNg?.cateSmallId ?? ""}
          onChange={(event) => {
            onCategoryNgChanged({
              ...itemCategoryNg,
              cateSmallId: event.target.value as number | undefined,
            });
          }}
        >
          <MenuItem value={undefined}>選択しない</MenuItem>
          {ngData.itemMediumCategories
            ?.find((c) => c.id === itemCategoryNg.cateMediumId)
            ?.itemSmallCategories?.map((smallCategory) => (
              <MenuItem key={smallCategory.id} value={smallCategory.id}>
                {smallCategory.name}
              </MenuItem>
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
