import React, { ReactNode, useState } from "react";
import { TAdminShowResponse } from "../../../hooks/api/UseAdminShow";
import { TMembersShow } from "../../../hooks/api/UseMembersShow";

export type TContext<T> = {
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

export const MemberShowContext = React.createContext<
  TContext<null | TMembersShow>
>({
  state: null,
  setter: () => {},
});

export const AdminShowContext = React.createContext<
  TContext<null | TAdminShowResponse>
>({
  state: null,
  setter: () => {},
});

type TProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: TProps) => {
  const [chartId, setChartId] = useState<null | number>(null);
  const [memberId, setMemberId] = useState<null | number>(null);
  const [memberShow, setMemberShow] = useState<null | TMembersShow>(null);
  const [adminShow, setAdminShow] = useState<null | TAdminShowResponse>(null);

  return (
    <MemberShowContext.Provider
      value={{ state: memberShow, setter: setMemberShow }}
    >
      <MemberIdContext.Provider
        value={{ state: memberId, setter: setMemberId }}
      >
        <ChartIdContext.Provider value={{ state: chartId, setter: setChartId }}>
          <AdminShowContext.Provider
            value={{ state: adminShow, setter: setAdminShow }}
          >
            {children}
          </AdminShowContext.Provider>
        </ChartIdContext.Provider>
      </MemberIdContext.Provider>
    </MemberShowContext.Provider>
  );
};
