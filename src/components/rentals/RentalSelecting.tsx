import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useBrowsesSearchPrerequisite } from "../../hooks/api/UseBrowsesSearchPrerequisite";
import { TItem } from "../../model/selecting/TItem";
import { useBrowseStyle } from "../selecting/browse/style/UseBrowseStyle";
import { FilterContainer } from "./FilterContainer";
import { RentalSelectionProgress } from "./RentalSelectionProgress";

type TProps = {
  rentalCoordinateItems: TItem[];
  onClickCompleteButton: () => void;
};

export const RentalSelecting = ({
  rentalCoordinateItems,
  onClickCompleteButton,
}: TProps) => {
  const classes = useBrowseStyle();
  const RENTABLE_NUM = 3;
  const { data, error } = useBrowsesSearchPrerequisite();
  const [categoryId, setCategoryId] = useState<number>();
  const [currentIndex, setCurrentIndex] = useState<number>(
    rentalCoordinateItems.length >= RENTABLE_NUM
      ? rentalCoordinateItems.length - 1
      : rentalCoordinateItems.length,
  );
  const [selectedPreregisteredItemId, setSelectedPreregisteredItemId] =
    useState<number>();

  const currentItemId: number | undefined = rentalCoordinateItems[currentIndex]
    ? rentalCoordinateItems[currentIndex].id
    : undefined;
  const handleItemSelect = () => {
    if (rentalCoordinateItems.length >= RENTABLE_NUM) {
      setCurrentIndex(RENTABLE_NUM - 1);
    } else {
      setCurrentIndex(rentalCoordinateItems.length);
    }
  };

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;

  return (
    <div
      style={{
        margin: "80px 0 220px",
      }}
    >
      <FormControl className={classes.categorySelection}>
        <InputLabel id="category-select-label">カテゴリー</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryId ?? ""}
          onChange={(event) => {
            setSelectedPreregisteredItemId(undefined);
            setCategoryId(event.target.value as number);
          }}
        >
          {data.category.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {categoryId && (
        <FilterContainer
          categoryId={categoryId}
          onClickItemCard={(id: number) => {
            setSelectedPreregisteredItemId(id);
          }}
          selectedPreregisteredItemId={selectedPreregisteredItemId}
          onClickCancel={() => setSelectedPreregisteredItemId(undefined)}
          onItemSelect={handleItemSelect}
          currentItemId={currentItemId}
        />
      )}
      <Paper
        style={{
          position: "fixed",
          bottom: 0,
          left: "360px",
          right: "16px",
          margin: "0 16px",
          zIndex: 5,
        }}
      >
        <RentalSelectionProgress
          items={rentalCoordinateItems}
          selectedIndex={currentIndex}
          rentableNum={RENTABLE_NUM}
          onSelect={(i) => setCurrentIndex(i)}
          onClickCompleteButton={onClickCompleteButton}
        />
      </Paper>
    </div>
  );
};
