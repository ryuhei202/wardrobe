import React from "react";
import ItemCardResponse from "../../../model/api/response/styling/browse/ItemCardResponse";
import ItemCardCollectionCallback from "./callback/ItemCardCollectionCallback";
import { useItemCardCollectionHandler } from "./handler/UseItemCardCollectionHandler";
import ItemCard from "./ItemCard";
import { useBrowseStyle } from "./style/UseBrowseStyle";

interface ItemCardCollectionProps {
  response: ItemCardResponse[];
  callback: ItemCardCollectionCallback;
}

const ItemCardCollection = (props: ItemCardCollectionProps) => {
  const classes = useBrowseStyle();
  const handler = useItemCardCollectionHandler(props.response, props.callback);

  return (
    <>
      <div className={classes.cardCollection}>
        {handler.itemCardArrayData().map((itemCard, index) => (
          <ItemCard
            data={itemCard}
            callback={handler.itemCardCallback(index)}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default ItemCardCollection;
