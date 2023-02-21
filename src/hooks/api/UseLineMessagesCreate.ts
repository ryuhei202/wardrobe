import { usePostRequest } from "./UsePostRequest";
import { MemberIdContext } from "./../../components/context/provider/ContextProvider";
import { useContextDefinedState } from "./../../components/context/UseContextDefinedState";

export type TLineMessageCreateParams = {
  readonly messages: any[];
};

export const useLineMessagesCreate = ({
  messages,
}: TLineMessageCreateParams) => {
  const params: TLineMessageCreateParams = {
    messages,
  };
  const memberId = useContextDefinedState(MemberIdContext);
  const { mutate, error, isLoading } = usePostRequest<TLineMessageCreateParams>(
    `members/${memberId}/line_messages`,
    params
  );

  return {
    mutate,
    error,
    isLoading,
  };
};
