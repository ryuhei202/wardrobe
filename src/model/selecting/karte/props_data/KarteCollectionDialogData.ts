import { KarteIndexResponse } from "../../../api/response/styling/karte/KarteIndexResponse";

export interface KarteCollectionDialogData {
  readonly isOpen: boolean;
  readonly karteResponses: KarteIndexResponse[];
}
