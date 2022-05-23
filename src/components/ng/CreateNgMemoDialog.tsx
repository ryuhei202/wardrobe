import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useChartItemsIndex } from "../../hooks/api/UseChartItemsIndex";
import { useNgsNew } from "../../hooks/api/UseNgsNew";
import { ItemCategoryNg } from "../../model/api/request/styling/ng/ItemCategoryNg";
import { SizeNg } from "../../model/api/request/styling/ng/SizeNg";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { NgCategoryIndexResponse } from "../../model/api/response/styling/ngCategory/NgCategoryIndexResponse";
import { NG_CATEGORY } from "../../model/selecting/ng/NgCategory";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { getFormValidateHandler } from "./handler/getFormValidateHandler";
import { NgChartItemForm } from "./NgChartItemForm";
import { NgDetailForm } from "./NgDetailForm";

type TProps = {
  readonly ngCategoryData: NgCategoryIndexResponse;
  readonly karteData: KarteIndexResponse[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
};
export const CreateNgMemoDialog = ({
  ngCategoryData,
  karteData,
  isOpen,
  onClose,
}: TProps) => {
  const [ngCategoryId, setNgCategoryId] = useState<number | undefined>(
    undefined
  );
  const [freeText, setFreetext] = useState<string>("");
  const [chartItemId, setChartItemId] = useState<number | undefined>(undefined);
  const [targetChartId, setTargetChartId] = useState<number | undefined>(
    undefined
  );
  const [itemCategoryNg, setItemCategoryNg] = useState<
    ItemCategoryNg | undefined
  >(undefined);
  const [sizeNg, setSizeNg] = useState<SizeNg | undefined>(undefined);

  const { data: chartItemsData, error: chartItemsError } = useChartItemsIndex({
    chartId: targetChartId,
  });
  const { data: ngData, error: ngError } = useNgsNew({
    memberId: useContextDefinedState(MemberIdContext),
    ngCategoryId,
  });

  /* ダイアログを閉じる処理ではcomponentは破棄されないのでstateが初期化されない */
  useEffect(() => {
    setNgCategoryId(undefined);
    setFreetext("");
    setChartItemId(undefined);
    setTargetChartId(undefined);
    setItemCategoryNg(undefined);
    setSizeNg(undefined);
  }, [isOpen]);

  const { isDisabled } = getFormValidateHandler({
    targetChartId,
    chartItemId,
    ngCategoryId,
    sizeNg,
    itemCategoryNg,
  });

  const handleChangeNgCategory = (value: number) => {
    setNgCategoryId(value);
    value == NG_CATEGORY.ITEM_CATEGORY_NG
      ? setItemCategoryNg({ isOnlyJacketPlan: false })
      : setItemCategoryNg(undefined);
    setSizeNg(undefined);
  };
  useEffect(() => {
    return setChartItemId(undefined);
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>新規NGメモ追加</DialogTitle>
      <div style={{ width: 600, textAlign: "center" }}>
        <Box
          sx={{
            width: 400,
            marginBottom: 4,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography align="left">対象カルテ</Typography>
          <FormControl style={{ textAlign: "center" }}>
            <InputLabel>対象カルテ</InputLabel>
            <Select
              style={{ width: 400 }}
              onChange={(event) => {
                setTargetChartId(event.target.value as number | undefined);
                setChartItemId(undefined);
              }}
            >
              <MenuItem value={undefined}>対象カルテなし</MenuItem>
              {karteData.map((karte) => (
                <MenuItem value={karte.id}>{`${karte.id} ${
                  karte.rentalStartedAt ?? "未"
                }発送`}</MenuItem>
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
          <Typography align="left">NGの種類</Typography>
          <FormControl>
            <InputLabel>NGの種類</InputLabel>
            <Select
              style={{ width: 400 }}
              onChange={(event) =>
                handleChangeNgCategory(event.target.value as number)
              }
            >
              {ngCategoryData.ngCategories.map((ngCategory) => (
                <MenuItem value={ngCategory.id}>{ngCategory.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {chartItemsData && targetChartId && (
          <NgChartItemForm
            chartItemsData={chartItemsData}
            onChange={(chartItemId: number) => setChartItemId(chartItemId)}
          />
        )}
        {ngData && ngCategoryId && (
          <NgDetailForm
            ngCategoryId={ngCategoryId}
            ngData={ngData}
            sizeNg={sizeNg}
            itemCategoryNg={itemCategoryNg}
            freeText={freeText}
            onSizeNgChanged={(sizeNg) => setSizeNg(sizeNg)}
            onCategoryNgChanged={(itemCategoryNg) =>
              setItemCategoryNg(itemCategoryNg)
            }
            onTextChanged={(freeText) => setFreetext(freeText)}
          />
        )}
        <Box
          sx={{
            width: 400,
            marginBottom: 4,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "right",
          }}
        >
          <Button color="secondary" variant="contained" disabled={isDisabled}>
            登録
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};
