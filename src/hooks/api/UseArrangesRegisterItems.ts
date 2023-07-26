import { PostRegisterItemsParamsParams } from "../../model/api/request/styling/arrange/PostRegisterItemsParams";
import { usePostRequest } from "./UsePostRequest";

type TArrangesRegisterItemsArg = PostRegisterItemsParamsParams;

export const useArrangesRegisterItems = ({
  adminId,
  coordinateId,
  itemIds,
}: TArrangesRegisterItemsArg) => {
  const { mutate, error, isLoading } =
    usePostRequest<PostRegisterItemsParamsParams>(
      "styling/arranges/register_items",
      {
        coordinateId,
        adminId,
        itemIds,
      },
    );

  return {
    mutate,
    error,
    isLoading,
  };
};
