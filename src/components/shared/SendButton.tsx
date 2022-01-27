import { IconButton, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
};
export const SendButton = ({ onClick, disabled, className }: Props) => {
  return (
    <Tooltip
      title={
        <div style={{ textAlign: "center" }}>
          更新する
          <br /> alt(option) + Enter
        </div>
      }
      followCursor
    >
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color="primary"
        className={className}
      >
        <SendIcon />
      </IconButton>
    </Tooltip>
  );
};
