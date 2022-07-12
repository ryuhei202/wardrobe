import { CircularProgress, Typography } from "@mui/material";
import { useKartesIndex } from "../../hooks/api/UseKartesIndex";
import { MemberIdContext } from "../context/provider/ContextProvider";
import { useContextDefinedState } from "../context/UseContextDefinedState";
import { PastChartsDialog } from "./PastChartsDialog";

type TProps = {
  isOpen: boolean;
  setter: React.Dispatch<boolean>;
};
export const PastChartsDialogContainer = ({ isOpen, setter }: TProps) => {
  const LIMIT_NUM = 10;
  const OFFSET_NUM = 1;

  const { data, error } = useKartesIndex({
    memberId: useContextDefinedState(MemberIdContext),
    limit: LIMIT_NUM,
    offset: OFFSET_NUM,
  });

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) return <CircularProgress />;
  return <PastChartsDialog response={data} isOpen={isOpen} setter={setter} />;
};
