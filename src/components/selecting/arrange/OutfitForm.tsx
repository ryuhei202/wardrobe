import { Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { AdviceCategoryResponse } from "../../../model/api/response/styling/arrange/AdviceCategoryResponse";
import { OutfitFormData } from "../../../model/selecting/arrange/props_data/OutfitFormData";
import { MemberShowContext } from "../../context/provider/ContextProvider";
import { useContextDefinedState } from "../../context/UseContextDefinedState";
import { OutfitFormCallback } from "./callback/OutfitFormCallback";
import { useOutfitFormStyle } from "./style/UseOutfitFormStyle";

export interface OutfitFormProps {
  data: OutfitFormData;
  response: AdviceCategoryResponse[];
  callback: OutfitFormCallback;
}

export const OutfitForm = (props: OutfitFormProps) => {
  const classes = useOutfitFormStyle();
  const memberShow = useContextDefinedState(MemberShowContext);
  const isMarriagePlan = memberShow.data?.isMarriagePlan ?? false;

  const getSelectedCategories = useCallback((): (number | null)[] => {
    return props.data.selectedAdviceIds.map((id) => {
      if (id === null) return null;
      let index = null;
      props.response.forEach((response, categoryIndex) => {
        response.advice.forEach((advice) => {
          if (advice.id === id) index = categoryIndex;
        });
      });
      return index;
    });
  }, [props.data.selectedAdviceIds, props.response]);

  const [selectedCategories, setSelectedCategories] = useState(
    getSelectedCategories()
  );

  useEffect(() => {
    setSelectedCategories(getSelectedCategories());
  }, [getSelectedCategories]);

  return (
    <>
      {isMarriagePlan ? (
        <FormControl margin="normal" style={{ width: 120 }}>
          <InputLabel id="formal-level-select-label">
            フォーマルレベル
          </InputLabel>
          <Select
            labelId="formal-level-select-label"
            id="formal-level-select"
            value={props.data.formalLevel}
            label="フォーマルレベル"
            onChange={(event) => {
              props.callback.onSelectFormalLevel(event.target.value as number);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
      <List>
        {props.data.items.map((item) => {
          const labelId = `color-checkbox-list-label-${item.itemId}`;
          return (
            <ListItem
              key={item.itemId}
              role={undefined}
              dense
              button
              onClick={() => props.callback.onSelectItem(item.itemId)}
            >
              <ListItemIcon>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.isSelected}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  label={
                    <img
                      src={item.itemImagePath}
                      width="40px"
                      height="auto"
                      alt=""
                    />
                  }
                ></FormControlLabel>
              </ListItemIcon>
              <ListItemText>
                {item.itemId}: {item.categoryName}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      <div>
        {props.data.selectedAdviceIds.map((selectedAdviceId, index) => {
          let selectedCategoryIndex = selectedCategories[index];
          let selectedCategory =
            selectedCategoryIndex !== null
              ? props.response[selectedCategoryIndex]
              : null;
          return (
            <Fragment key={index}>
              <Grid container spacing={2}>
                <Grid item xs={3} xl={2}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id={`category-select-label-${index}`}>
                      カテゴリ
                    </InputLabel>
                    <Select
                      labelId={`category-select-label-${index}`}
                      id={`category-select-${index}`}
                      value={selectedCategories[index] ?? ""}
                      label="カテゴリ"
                      onChange={(event) => {
                        let newSelectedCategories = [...selectedCategories];
                        newSelectedCategories[index] = event.target
                          .value as number;
                        setSelectedCategories(newSelectedCategories);
                      }}
                    >
                      {props.response.map((response, categoryIndex) => (
                        <MenuItem key={categoryIndex} value={categoryIndex}>
                          {response.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} xl={4}>
                  <FormControl fullWidth className={classes.adviceFormControl}>
                    <InputLabel id={`advice-select-label-${index}`}>
                      アドバイス
                    </InputLabel>
                    <Select
                      labelId={`advice-select-label-${index}`}
                      id={`advice-select-${index}`}
                      value={selectedAdviceId ?? ""}
                      label="アドバイス"
                      onChange={(event) => {
                        props.callback.onSelectAdvice(
                          event.target.value as number,
                          index
                        );
                      }}
                    >
                      {selectedCategory?.advice.map((advice) => (
                        <MenuItem key={advice.id} value={advice.id}>
                          {advice.title}
                        </MenuItem>
                      )) ?? null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <IconButton
                    onClick={() => props.callback.onClickDeleteAdvice(index)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography variant="body1" marginBottom={2}>
                {selectedCategory?.advice.find(
                  (advice) => advice.id === selectedAdviceId
                )?.description ?? ""}
              </Typography>
            </Fragment>
          );
        })}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.registerButton}
        onClick={() => {
          props.callback.onClickAddOutfit();
        }}
      >
        この着こなしアドバイスを追加する
      </Button>
    </>
  );
};
