import ArrangeData from "../../../model/styling/arrange/props_data/ArrangeData";
import ArrangeCallback from "./callback/ArrangeCallback";
import { useAdviceChoiceProvider } from "./provider/UseAdviceChoiceProvider";

export interface ArrangeContainerProps {
  data: ArrangeData;
  callback: ArrangeCallback;
}

const ArrangeContainer = (props: ArrangeContainerProps) => {
  const adviceChoiceProvider = useAdviceChoiceProvider();
  return (
    <>{adviceChoiceProvider.arrangeComponent(props.data, props.callback)}</>
  );
};

export default ArrangeContainer;
