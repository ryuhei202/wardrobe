import { useContextDefinedState } from "./../../components/context/UseContextDefinedState";
import { MemberIdContext } from "./../../components/context/provider/ContextProvider";
import { usePostRequest } from "./UsePostRequest";

export type TLineMessageCreateParams = {
  readonly messages: string;
};

export const useLineMessagesCreate = () => {
  const memberId = useContextDefinedState(MemberIdContext);
  const { mutate, error, isLoading } = usePostRequest<TLineMessageCreateParams>(
    `styling/members/${memberId}/line_messages`,
  );

  return {
    mutate,
    error,
    isLoading,
  };
};
