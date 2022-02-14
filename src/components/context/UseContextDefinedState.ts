import { useContext } from "react";
import { TContext } from "./provider/ContextProvider";

export const useContextDefinedState = <T>(
  context: React.Context<TContext<T>>
) => {
  const state = useContext(context).state;

  if (state === null) {
    throw new Error("Context state null error.");
  }

  return state as Exclude<T, null>;
};
