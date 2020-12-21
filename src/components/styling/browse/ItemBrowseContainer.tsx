import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

export interface ItemBrowseContainerProps {
  callback: ItemBrowseCallback;
}

const ItemBrowseContainer = (props: ItemBrowseContainerProps) => {
  const refinementChoiceProvider = useRefinementChoiceProvider();
  return <>{refinementChoiceProvider.itemBrowseComponent(props.callback)}</>;
};

export default ItemBrowseContainer;
