import { usePostRequest } from "./UsePostRequest";
import { MemberIdContext } from "./../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "./../../components/context/UseContextDefinedState";

export type TLineMessageCreateParams = {
  readonly messages: string;
};

export const useLineMessagesCreate = () => {
  const memberId = useContextDefinedState(MemberIdContext);
  const { mutate, error, isLoading } = usePostRequest<TLineMessageCreateParams>(
    `members/${memberId}/line_messages`
  );

  return {
    mutate,
    error,
    isLoading,
  };
};
