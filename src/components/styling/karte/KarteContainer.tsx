import { KarteContainerCallback } from "./callback/KarteContainerCallback";
import { useKarteProvider } from "./provider/UseKarteProvider";

export interface KarteContainerProps {
  callback: KarteContainerCallback;
}

export const KarteContainer = (props: KarteContainerProps) => {
  const karteProvider = useKarteProvider(props.callback.onKarteFetched);

  return <>{karteProvider.karteComponent()}</>;
};
