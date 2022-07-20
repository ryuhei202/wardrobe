import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";
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
}: TNgsCreateArg): {
  mutate: UseMutateFunction<AxiosResponse<any>, Error | null, void, unknown>;
  error: Error | null;
  isLoading: boolean;
  isIdle: boolean;
} => {
  const params: NgCreateRequest = {
    ngCategoryId,
    freeText,
    chartItemId,
    itemCategoryNg,
    sizeNg,
  };
  const memberId = useContextDefinedState(MemberIdContext);
  const { mutate, error, isLoading, isIdle } = usePostRequest(
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
