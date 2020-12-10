import React from "react";
import ItemCardResponse from "../../../model/api/response/styling/browse/ItemCardResponse";
import ItemCard from "./ItemCard";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardCollectionProps {
  data: ItemCardResponse[] | null;
}

const ItemCardCollection = (props: ItemCardCollectionProps) => {
  const classes = useBrowseStyle();
  return (
    <>
      <div className={classes.cardCollection}>
        {props.data?.map((item) => (
          <ItemCard data={item} />
        ))}
      </div>
    </>
  );
};

export default ItemCardCollection;
