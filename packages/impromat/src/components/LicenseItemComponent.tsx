import { Attribution } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  name?: string | null;
  sourceUrl?: string | null;
  authorName?: string | null;
  authorUrl?: string | null;
  licenseUrl?: string | null;
  licenseName?: string | null;
}

export const LicenseItemComponent: React.FC<ContainerProps> = ({
  name,
  sourceUrl,
  authorUrl,
  authorName,
  licenseName,
  licenseUrl,
}) => {
  const OptionalLink = (
    text: string | undefined | null,
    url: string | undefined | null,
  ) =>
    url ? (
      <a href={url} target="_blank" rel="noreferrer">
        {text}
      </a>
    ) : (
      text
    );

  const { t } = useTranslation("LicenseItemComponent");

  return (
    <ListItem>
      <ListItemIcon>
        <Attribution />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ noWrap: false }}>
        {t("Based on")} "{OptionalLink(name, sourceUrl)}"
        {authorName && (
          <>
            {" "}
            {t("from")} {OptionalLink(authorName, authorUrl)}
            {licenseName && (
              <>
                , {t("licensed under")} {OptionalLink(licenseName, licenseUrl)}
              </>
            )}
          </>
        )}
      </ListItemText>
    </ListItem>
  );
};
