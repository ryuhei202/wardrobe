import React from "react";
import ItemCardData from "../../../model/styling/browse/data/ItemCardData";
import ItemCard from "./ItemCard";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardArrayProps {
  data: ItemCardData[];
}

const ItemCardArray = (props: ItemCardArrayProps) => {
  const classes = useBrowseStyle();
  return (
    <>
      <div className={classes.cardCollection}>
        {props.data?.map((itemCard) => (
          <ItemCard data={itemCard} />
        ))}
      </div>
    </>
  );
};

export default ItemCardArray;
