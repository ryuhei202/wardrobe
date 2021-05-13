import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

export interface ItemBrowseContainerProps {
  callback: ItemBrowseCallback;
  categoryId: number;
  silhouetteId: number | null;
  currentSelectedItemId: number | null;
}

const ItemBrowseContainer = (props: ItemBrowseContainerProps) => {
  const refinementChoiceProvider = useRefinementChoiceProvider(
    props.categoryId,
    props.silhouetteId
  );
  return (
    <>
      {refinementChoiceProvider.itemBrowseComponent(
        props.callback,
        props.currentSelectedItemId
      )}
    </>
  );
};

export default ItemBrowseContainer;
