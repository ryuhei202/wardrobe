import { UpdateSizes } from "./UpdateSizes";

export interface MemberSizeUpdateRequest {
  member_id: number;
  sizes: UpdateSizes;
}
