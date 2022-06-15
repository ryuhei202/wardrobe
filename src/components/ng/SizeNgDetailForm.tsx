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
    return `${sizeNg.itemPartSize}はNGに含みます`;
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
        <Typography align="left" style={{ paddingBottom: 5 }}>
          中カテゴリー一覧
        </Typography>
        <FormControl>
          <InputLabel>
            {sizeNg?.cateMediumId === undefined ? "任意" : ""}
          </InputLabel>
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
          marginBottom: 4,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography align="left" style={{ paddingBottom: 5 }}>
          部位一覧
        </Typography>
        <FormControl>
          <InputLabel>
            {sizeNg?.itemPart === undefined ? "任意" : ""}
          </InputLabel>
          <Select
            style={{ width: 100 }}
            onChange={(event) =>
              onSizeNgChanged({
                ...sizeNg,
                itemPart: event.target.value as number | undefined,
                itemPartSize: undefined,
                inequalitySign: undefined,
              })
            }
          >
            <MenuItem value={undefined}></MenuItem>
            {ngData.itemParts?.map((itemPart) => (
              <MenuItem key={itemPart.id} value={itemPart.id}>
                {itemPart.name}
              </MenuItem>
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
          <InputLabel>
            {sizeNg?.itemPart !== undefined &&
            sizeNg?.inequalitySign === undefined
              ? "必須"
              : ""}
          </InputLabel>
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
            <MenuItem key={0} value={undefined}></MenuItem>
            <MenuItem key={OR_OVER} value={OR_OVER}>
              以上
            </MenuItem>
            <MenuItem key={OR_UNDER} value={OR_UNDER}>
              以下
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
