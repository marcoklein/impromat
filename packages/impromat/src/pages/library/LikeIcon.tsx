import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  isLiked: boolean;
  color?: "like" | "inherit";
}

export const LikeIcon: React.FC<ComponentProps> = ({ isLiked, color }) => {
  const { t } = useTranslation("LikeIcon");
  return isLiked ? (
    <Favorite color={color ?? "like"} aria-label={t("removeLike")} />
  ) : (
    <FavoriteBorder color={color ?? "like"} aria-label={t("addLike")} />
  );
};
