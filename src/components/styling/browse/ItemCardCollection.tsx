import React from "react";
import BrowseIndexResponse from "../../../model/api/response/styling/browse/BrowseIndexResponse";
import { useItemCardCollectionHandler } from "./handler/UseItemCardCollectionHandler";
import ItemCard from "./ItemCard";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardCollectionProps {
  response: BrowseIndexResponse;
}

const ItemCardCollection = (props: ItemCardCollectionProps) => {
  const classes = useBrowseStyle();
  const handler = useItemCardCollectionHandler(props.response.itemCard);

  return (
    <>
      <div className={classes.cardCollection}>
        {handler.itemCardArrayData().map((itemCard) => (
          <ItemCard data={itemCard} />
        ))}
      </div>
    </>
  );
};

export default ItemCardCollection;
