import { useState } from "react";

type KarteHandler = {
  readonly isChecked: boolean;
  readonly onChangeItemCollection: () => void;
};

export const useKarteHandler = (): KarteHandler => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const onChangeItemCollection = () => {
    setIsChecked(!isChecked);
  };
  return {
    isChecked,
    onChangeItemCollection,
  };
};
