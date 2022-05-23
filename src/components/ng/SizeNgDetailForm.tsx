import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SizeNg } from "../../model/api/request/styling/ng/SizeNg";
import { NgNewResponse } from "../../model/api/response/styling/ng/NgNewResponse";

type TProps = {
  readonly ngData: NgNewResponse;
  readonly sizeNg?: SizeNg;
  readonly onSizeNgChanged: (sizeNg: SizeNg) => void;
};

export const SizeNgDetailForm = ({
  ngData,
  sizeNg,
  onSizeNgChanged,
}: TProps) => {
  const OR_OVER = 1;
  const OR_UNDER = 2;

  return (
    <>
      <Box
        sx={{
          width: 400,
          marginBottom: 4,
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
              onSizeNgChanged({
                ...sizeNg,
                cateMediumId: event.target.value as number,
              })
            }
          >
            {ngData.itemMediumCategories?.map((mediumCategory) => (
              <MenuItem value={mediumCategory.id}>
                {mediumCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: 400,
          marginBottom: 4,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography align="left">部位一覧</Typography>
        <FormControl>
          <InputLabel>部位一覧</InputLabel>
          <Select
            style={{ width: 100 }}
            onChange={(event) =>
              onSizeNgChanged({
                ...sizeNg,
                itemPart: event.target.value as number,
              })
            }
          >
            {ngData.itemParts?.map((itemPart) => (
              <MenuItem value={itemPart.id}>{itemPart.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="サイズ"
          type="number"
          style={{ width: 150 }}
          onChange={(event) =>
            onSizeNgChanged({
              ...sizeNg,
              itemPartSize: Number(event.target.value),
            })
          }
        />
        cm
        <FormControl>
          <InputLabel>選択してください</InputLabel>
          {/* 以上、以下の時にwardrobeで出るのか出ないのか戸惑う時があるので、明記してくれたら嬉しい */}
          <Select
            style={{ width: 120 }}
            onChange={(event) =>
              onSizeNgChanged({
                ...sizeNg,
                inequalitySign: event.target.value as number,
              })
            }
          >
            <MenuItem value={OR_OVER}>以上</MenuItem>
            <MenuItem value={OR_UNDER}>以下</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
