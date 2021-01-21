import ValidationDialogCallback from "./callback/ValidationDialogCallback";
import { useValidationDialogContainerHandler } from "./handler/UseValidationDialogContainerHandler";
import { useValidationProvider } from "./provider/UseValidationProvider";

export interface ValidationDialogContainerProps {
  itemId: number;
  callback: ValidationDialogCallback;
}

const ValidationDialogContainer = (props: ValidationDialogContainerProps) => {
  const handler = useValidationDialogContainerHandler(props.callback);
  const validationProvider = useValidationProvider(
    handler.onRequestComplete,
    props.itemId
  );

  return <>{validationProvider.validationDialogComponent(props.callback)}</>;
};

export default ValidationDialogContainer;
