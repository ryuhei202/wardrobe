import ItemBrowseCallback from "./callback/ItemBrowseCallback";
import { useCategoryChoiceProvider } from "./provider/UseCategoryChoiceProvider";

export interface BrowseContainerProps {
  callback: ItemBrowseCallback;
}

const BrowseContainer = (props: BrowseContainerProps) => {
  const categoryChoiceProvider = useCategoryChoiceProvider();
  return <>{categoryChoiceProvider.browseComponent(props.callback)}</>;
};

export default BrowseContainer;
