import { TItem } from "../../../../selecting/TItem";
import { Plan } from "./Plan";

export interface KarteShowResponse {
  readonly id: number;
  readonly hearingCompleted: boolean;
  readonly rentalStartedAt: string | null;
  readonly defaultItemNum: number;
  readonly registeredItems: TItem[];
  readonly isLeeapPlan: boolean;
  readonly plan: Plan;
}
