import { MemberIdContext } from "../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "../../components/context/UseContextDefinedState";
import { NgCreateRequest } from "../../model/api/request/styling/ng/NgCreateRequest";
import { usePostRequest } from "./UsePostRequest";

type TNgsCreateArg = NgCreateRequest;

export const useNgsCreate = ({
  ngCategoryId,
  freeText,
  chartItemId,
  itemCategoryNg,
  sizeNg,
}: TNgsCreateArg) => {
  const params: NgCreateRequest = {
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
  };
  const memberId = useContextDefinedState(MemberIdContext);
  const { mutate, error, isLoading, isIdle } = usePostRequest<NgCreateRequest>(
    `members/${memberId}/ngs`,
    params
  );

  return {
    mutate,
    error,
    isLoading,
    isIdle,
  };
};
