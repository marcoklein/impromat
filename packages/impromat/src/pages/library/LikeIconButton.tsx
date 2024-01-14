import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  onClick: () => void;
  isLiked: boolean;
  disabled?: boolean;
}

export const LikeIconButton: React.FC<ComponentProps> = ({
  onClick,
  isLiked,
  disabled,
}) => {
  const { t } = useTranslation("LikeIconButton");
  return (
    <IconButton onClick={onClick} color="like" disabled={disabled}>
      {isLiked === false ? (
        <Favorite color="inherit" aria-label={t("removeLike")} />
      ) : (
        <FavoriteBorder color="inherit" aria-label={t("addLike")} />
      )}
    </IconButton>
  );
};
