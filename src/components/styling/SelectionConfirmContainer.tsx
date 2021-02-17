import SelectionConfirmData from "../../model/styling/props_data/SelectionConfirmData";
import SelectionConfirmCallback from "./callback/SelectionConfirmCallback";
import { useConfirmProvider } from "./provider/UseConfirmProvider";

export interface SelectionConfirmContainerProps {
  data: SelectionConfirmData;
  callback: SelectionConfirmCallback;
}

const SelectionConfirmContainer = (props: SelectionConfirmContainerProps) => {
  const provider = useConfirmProvider(
    props.data.items.map((item) => item.itemId)
  );

  return provider.selectionConfirmComponent(props.data, props.callback);
};

export default SelectionConfirmContainer;
