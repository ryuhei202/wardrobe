import { useRefinementChoiceProvider } from "./provider/UseRefinementChoiceProvider";

const ItemBrowse = () => {
  const itemBrowseProvider = useRefinementChoiceProvider();

  return <>{itemBrowseProvider.browseIndexComponent()}</>;
};

export default ItemBrowse;
