import { IconButton } from "@mui/material";
import { LikeIcon } from "./LikeIcon";

interface ComponentProps {
  onClick: () => void;
  isLiked: boolean;
  disabled?: boolean;
  color?: "like" | "inherit";
}

export const LikeIconButton: React.FC<ComponentProps> = ({
  onClick,
  isLiked,
  disabled,
  color,
}) => {
  return (
    <IconButton onClick={onClick} color="like" disabled={disabled}>
      <LikeIcon isLiked={isLiked} />
    </IconButton>
  );
};
