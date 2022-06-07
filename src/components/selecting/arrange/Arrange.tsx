import { ArrangeData } from "../../../model/selecting/arrange/props_data/ArrangeData";
import { useAdviceChoiceProvider } from "./provider/UseAdviceChoiceProvider";

type TProps = {
  data: ArrangeData;
  coordinateId: number;
};

export const Arrange = ({ data, coordinateId }: TProps) => {
  const adviceChoiceProvider = useAdviceChoiceProvider({
    coordinateId: coordinateId,
  });

  return <>{adviceChoiceProvider.arrangePatternComponent(data)}</>;
};
