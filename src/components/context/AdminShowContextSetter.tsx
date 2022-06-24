import { ReactNode, useContext, useEffect } from "react";
import { useAdminShow } from "../../hooks/api/UseAdminShow";
import { AdminShowContext } from "./provider/ContextProvider";

type TProps = {
  children: ReactNode;
  email: string;
};

export const AdminShowContextSetter = ({ children, email }: TProps) => {
  const setAdminId = useContext(AdminShowContext).setter;
  const { data } = useAdminShow({ email: email });

  useEffect(() => {
    if (data) {
      setAdminId(data);
    }
  }, [data, setAdminId]);

  return data !== undefined ? <>{children}</> : <></>;
};
