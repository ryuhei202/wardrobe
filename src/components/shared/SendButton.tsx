import { Button, Tooltip } from "@mui/material";

type Props = {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly style?: React.CSSProperties;
};
export const SendButton = ({ onClick, disabled, style }: Props) => {
  return (
    <Tooltip
      title={<div style={{ textAlign: "center" }}>alt(option) + Enter</div>}
      followCursor
    >
      <span>
        <Button
          onClick={onClick}
          disabled={disabled}
          style={style}
          variant="contained"
        >
          保存
        </Button>
      </span>
    </Tooltip>
  );
};
