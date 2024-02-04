import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { ImpromatLogoComponent } from "./ImpromatLogoComponent";

interface ComponentProps extends React.PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export const ImpromatHero: React.FC<ComponentProps> = ({
  title,
  subtitle,
  children,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mt: 2,
          p: 1,
          maxWidth: "768px",
        }}
      >
        <Box
          style={{
            maxHeight: "20%",
            maxWidth: "128px",
            margin: "0 auto",
          }}
        >
          <ImpromatLogoComponent></ImpromatLogoComponent>
        </Box>
        <Typography
          variant={isSmallScreen ? "h4" : "h2"}
          component="h1"
          sx={{ fontWeight: "bold" }}
        >
          {title ?? "impromat.app"}
        </Typography>
        {subtitle && <Typography>{subtitle}</Typography>}
        {children}
      </Box>
    </Box>
  );
};
