import { usePostRequest } from "./UsePostRequest";
import { PostRegisterItemsParamsParams } from "../../model/api/request/styling/arrange/PostRegisterItemsParams";

type TArrangesRegisterItemsArg = PostRegisterItemsParamsParams;

export const useArrangesRegisterItems = ({
  adminId,
  coordinateId,
  itemIds,
}: TArrangesRegisterItemsArg) => {
  const { mutate, error, isLoading } =
    usePostRequest<PostRegisterItemsParamsParams>("arranges/register_items", {
      coordinateId,
      adminId,
      itemIds,
    });

  return {
    mutate,
    error,
    isLoading,
  };
};
