import BrowseDetailCallback from "./callback/BrowseDetailCallback";
import { useBrowseDetailProvider } from "./provider/UseBrowseDetailProvider";

export interface BrowseDetailContainerProps {
  id: number;
  callback: BrowseDetailCallback;
}

const BrowseDetailContainer = (props: BrowseDetailContainerProps) => {
  const browseDetailProvider = useBrowseDetailProvider(props.id);
  return <>{browseDetailProvider.browseDetailComponent(props.callback)}</>;
};

export default BrowseDetailContainer;
