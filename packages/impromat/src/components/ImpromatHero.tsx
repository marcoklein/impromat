import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImpromatLogoComponent } from "./ImpromatLogoComponent";

interface ComponentProps extends React.PropsWithChildren {}

export const ImpromatHero: React.FC<ComponentProps> = ({ children }) => {
  const { t } = useTranslation("ImpromatHero");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          my: 2,
          p: 1,
          maxWidth: "412px",
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: 72,
              sm: 92,
            },
            margin: "0 auto",
          }}
        >
          <ImpromatLogoComponent></ImpromatLogoComponent>
        </Box>
        <Typography
          component="h1"
          variant="h1"
          sx={{ fontWeight: "bold", fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          {t("title")}
        </Typography>
        <Typography>{t("subtitle")}</Typography>
        {children}
      </Box>
    </Box>
  );
};
