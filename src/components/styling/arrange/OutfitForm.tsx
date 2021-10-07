import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import OutfitFormData from "../../../model/styling/arrange/props_data/OutfitFormData";
import OutfitFormCallback from "./callback/OutfitFormCallback";
import { useOutfitFormStyle } from "./style/UseOutfitFormStyle";

export interface OutfitFormProps {
  data: OutfitFormData;
  callback: OutfitFormCallback;
}

const OutfitForm = (props: OutfitFormProps) => {
  const classes = useOutfitFormStyle();

  return (
    <>
      <List>
        {props.data.items.map((item, index) => {
          const labelId = `color-checkbox-list-label-${item.itemId}`;
          return (
            <ListItem
              key={item.itemId}
              role={undefined}
              dense
              button
              onClick={() => props.callback.onSelectItem(index)}
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
        {props.data.advices.map((outfitAdvice, selectIndex) => (
          <Fragment key={selectIndex}>
            <FormControl className={classes.formControl}>
              <InputLabel id={`demo-simple-select-label-${selectIndex}`}>
                カテゴリ
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label-${selectIndex}`}
                id={`demo-simple-select-${selectIndex}`}
                value={outfitAdvice.selectedCategory ?? ""}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  props.callback.onSelectCategory(
                    selectIndex,
                    event.target.value as number
                  );
                }}
              >
                {outfitAdvice.categoryChoice.map((name, index) => (
                  <MenuItem key={index} value={index}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.adviceFormControl}>
              <InputLabel id={`simple-select-label-${selectIndex}`}>
                アドバイス
              </InputLabel>
              <Select
                labelId={`simple-select-label-${selectIndex}`}
                id={`simple-select-${selectIndex}`}
                value={outfitAdvice.selectedAdvice ?? ""}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  props.callback.onSelectAdvice(
                    selectIndex,
                    event.target.value as number
                  );
                }}
              >
                {outfitAdvice.adviceChoice.map((adviceChoice, index) => (
                  <MenuItem key={index} value={index}>
                    {adviceChoice.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body1" display="inline">
              {outfitAdvice.selectedAdvice
                ? outfitAdvice.adviceChoice[outfitAdvice.selectedAdvice]
                    .description
                : ""}
            </Typography>
            <br />
          </Fragment>
        ))}
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

export default OutfitForm;
