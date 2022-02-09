import React, { ReactNode, useState } from "react";

type TContext<T> = {
  state: T;
  setter: React.Dispatch<T>;
};

export const ChartIdContext = React.createContext<TContext<null | number>>({
  state: null,
  setter: () => {},
});

export const MemberIdContext = React.createContext<TContext<null | number>>({
  state: null,
  setter: () => {},
});

type TProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: TProps) => {
  const [chartId, setChartId] = useState<null | number>(null);
  const [memberId, setMemberId] = useState<null | number>(null);

  return (
    <MemberIdContext.Provider value={{ state: memberId, setter: setMemberId }}>
      <ChartIdContext.Provider value={{ state: chartId, setter: setChartId }}>
        {children}
      </ChartIdContext.Provider>
    </MemberIdContext.Provider>
  );
};
