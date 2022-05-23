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

  const helperText = (): string | undefined => {
    if (
      sizeNg?.itemPartSize === undefined ||
      sizeNg?.inequalitySign === undefined
    )
      return;
    if (sizeNg?.inequalitySign === OR_OVER) {
      return `${sizeNg.itemPartSize + 1}cmから表示される`;
    } else if (sizeNg?.inequalitySign === OR_UNDER) {
      return `${sizeNg.itemPartSize - 1}cmから表示される`;
    }
  };
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
        <FormControl error={sizeNg?.cateMediumId === undefined}>
          <InputLabel>中カテゴリ一覧</InputLabel>
          <Select
            style={{ width: 400 }}
            value={sizeNg?.cateMediumId ?? ""}
            onChange={(event) =>
              onSizeNgChanged({
                ...sizeNg,
                cateMediumId: event.target.value as number,
              })
            }
          >
            <MenuItem value={undefined}></MenuItem>
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
                itemPart: (event.target.value || undefined) as
                  | number
                  | undefined,
                itemPartSize: undefined,
                inequalitySign: undefined,
              })
            }
          >
            <MenuItem value="">入力しない</MenuItem>
            {ngData.itemParts?.map((itemPart) => (
              <MenuItem value={itemPart.id}>{itemPart.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          error={
            sizeNg?.itemPart !== undefined && sizeNg?.itemPartSize === undefined
          }
          label="サイズ"
          type="number"
          helperText={helperText()}
          disabled={sizeNg?.itemPart === undefined}
          style={{ width: 150, marginLeft: 5 }}
          value={sizeNg?.itemPartSize ?? ""}
          onChange={(event) =>
            onSizeNgChanged({
              ...sizeNg,
              itemPartSize: Number(event.target.value),
            })
          }
        />
        <span style={{ verticalAlign: "bottom" }}>cm</span>
        <FormControl
          error={
            sizeNg?.itemPart !== undefined &&
            sizeNg?.inequalitySign === undefined
          }
        >
          <InputLabel>選択してください</InputLabel>
          {/* 以上、以下の時にwardrobeで出るのか出ないのか戸惑う時があるので、明記してくれたら嬉しい */}
          <Select
            style={{ width: 120 }}
            disabled={sizeNg?.itemPart === undefined}
            value={sizeNg?.inequalitySign ?? ""}
            onChange={(event) =>
              onSizeNgChanged({
                ...sizeNg,
                inequalitySign: event.target.value as number | undefined,
              })
            }
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={OR_OVER}>以上</MenuItem>
            <MenuItem value={OR_UNDER}>以下</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
