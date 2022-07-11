import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ItemCategoryNg } from "../../model/api/request/styling/ng/ItemCategoryNg";
import { SizeNg } from "../../model/api/request/styling/ng/SizeNg";
import { KarteIndexResponse } from "../../model/api/response/styling/karte/KarteIndexResponse";
import { NgEditConvertResponse } from "../../model/api/response/styling/ng/NgEditConvertResponse";
import { NgCategoryIndexResponse } from "../../model/api/response/styling/ngCategory/NgCategoryIndexResponse";
import { NG_CATEGORY } from "../../model/selecting/ng/NgCategory";
import { getFormValidateHandler } from "./handler/getFormValidateHandler";
import { useNgFormHandler } from "./handler/UseNgFormHandler";
import { NgChartItemForm } from "./NgChartItemForm";
import { NgDetailForm } from "./NgDetailForm";

type TProps = {
  readonly ngCategoryData: NgCategoryIndexResponse;
  readonly karteData: KarteIndexResponse[];
  readonly ngEditData?: NgEditConvertResponse;
  readonly isOpen: boolean;
  readonly onClose: () => void;
};
export const NgMemoDialog = ({
  ngCategoryData,
  karteData,
  isOpen,
  onClose,
  ngEditData,
}: TProps) => {
  const [ngCategoryId, setNgCategoryId] = useState<number>(
    ngEditData ? ngEditData.ngCategoryId : NG_CATEGORY.SIZE_NG
  );
  const [freeText, setFreetext] = useState<string>(
    ngEditData ? ngEditData.freeText : ""
  );
  const [chartItemId, setChartItemId] = useState<number | undefined>(
    ngEditData ? ngEditData.chartItemId : undefined
  );
  const [targetChartId, setTargetChartId] = useState<number | undefined>(
    ngEditData ? ngEditData.chartId : undefined
  );
  const [itemCategoryNg, setItemCategoryNg] = useState<
    ItemCategoryNg | undefined
  >(ngEditData ? ngEditData.itemCategoryNg : undefined);
  const [sizeNg, setSizeNg] = useState<SizeNg | undefined>(
    ngEditData ? ngEditData.sizeNg : undefined
  );

  const {
    handleChangeNgCategory,
    handleChangeChartItem,
    handleClickSubmit,
    handleClickUpdate,
    chartItemsData,
    ngData,
    isCreateLoading,
    isUpdateLoading,
    severity,
    isSnackBarOpen,
    snackBarText,
    setIsSnackBarOpen,
  } = useNgFormHandler({
    targetChartId,
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
    ngEditData,
    onClose,
    setNgCategoryId,
    setItemCategoryNg,
    setSizeNg,
    setChartItemId,
  });

  const { isDisabled } = getFormValidateHandler({
    targetChartId,
    chartItemId,
    ngCategoryId,
    sizeNg,
    itemCategoryNg,
  });

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {ngEditData ? "NGメモ編集" : "新規NGメモ追加"}
        </DialogTitle>
        <div style={{ width: 600, textAlign: "center" }}>
          <Box
            sx={{
              width: 400,
              marginBottom: 2,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography align="left" style={{ paddingBottom: 5 }}>
              対象カルテ
            </Typography>
            <FormControl style={{ textAlign: "center" }}>
              <InputLabel>
                {targetChartId === undefined ? "任意" : ""}
              </InputLabel>
              <Select
                style={{ width: 400 }}
                onChange={(event) => {
                  setTargetChartId(event.target.value as number | undefined);
                  setChartItemId(undefined);
                }}
                defaultValue={targetChartId}
              >
                <MenuItem value={undefined}>対象カルテなし</MenuItem>
                {karteData.map((karte) => (
                  <MenuItem value={karte.id} key={karte.id}>
                    {`${karte.id} ${karte.rentalStartedAt ?? "未"}発送`}
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
              NGの種類
            </Typography>
            <FormControl error={ngCategoryId === undefined}>
              <InputLabel>
                {ngCategoryId === undefined ? "必須" : ""}
              </InputLabel>
              <Select
                style={{ width: 400 }}
                value={ngCategoryId}
                onChange={(event) =>
                  handleChangeNgCategory(event.target.value as number)
                }
              >
                {ngCategoryData.ngCategories.map((ngCategory) => (
                  <MenuItem value={ngCategory.id} key={ngCategory.id}>
                    {ngCategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {chartItemsData && targetChartId && (
            <NgChartItemForm
              chartItemsData={chartItemsData}
              chartItemId={chartItemId}
              onChange={(chartItemId: number) =>
                handleChangeChartItem(chartItemId)
              }
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
            {ngEditData ? (
              <Button
                color="secondary"
                variant="contained"
                disabled={isDisabled || isUpdateLoading}
                onClick={() => handleClickUpdate()}
              >
                更新
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                disabled={isDisabled || isCreateLoading}
                onClick={() => handleClickSubmit()}
              >
                登録
              </Button>
            )}
          </Box>
        </div>
      </Dialog>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
      >
        <Alert severity={severity}>{snackBarText}</Alert>
      </Snackbar>
    </>
  );
};
