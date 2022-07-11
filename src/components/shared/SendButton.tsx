import { IconButton, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly style?: React.CSSProperties;
};
export const SendButton = ({ onClick, disabled, style }: Props) => {
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
      <span>
        <IconButton
          onClick={onClick}
          disabled={disabled}
          color="primary"
          style={style}
        >
          <SendIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};
