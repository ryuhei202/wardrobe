import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

export interface ItemBrowseContainerProps {
  callback: ItemBrowseCallback;
  categoryId: number;
}

const ItemBrowseContainer = (props: ItemBrowseContainerProps) => {
  const refinementChoiceProvider = useRefinementChoiceProvider(
    props.categoryId
  );
  return <>{refinementChoiceProvider.itemBrowseComponent(props.callback)}</>;
};

export default ItemBrowseContainer;
