import { usePostRequest } from "./UsePostRequest";
import { PostRegisterItemsParamsParams } from "../../model/api/request/styling/arrange/PostRegisterItemsParams";

type TArrangesRegisterItemsArg = PostRegisterItemsParamsParams;

export const useArrangesRegisterItems = ({
  adminId,
  coordinateId,
  itemIds,
  createTrigger,
}: TArrangesRegisterItemsArg) => {
  const { mutate, error, isLoading } =
    usePostRequest<PostRegisterItemsParamsParams>("arranges/register_items", {
      coordinateId,
      adminId,
      itemIds,
      createTrigger,
    });

  return {
    mutate,
    error,
    isLoading,
  };
};
