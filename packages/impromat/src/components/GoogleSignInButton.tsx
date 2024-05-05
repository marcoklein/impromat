import { Box, Button } from "@mui/material";
import React from "react";

/**
 * Google sign in button that follows Google design specifications.
 *
 * https://developers.google.com/identity/branding-guidelines
 * https://about.google/brand-resource-center/logos-list/
 *
 * @param props
 * @returns
 */
export const GoogleSignInButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Button>
> = (props) => (
  <Button
    variant="contained"
    {...props}
    startIcon={
      <Box
        sx={{
          padding: "6px",
          width: "30px",
          height: "30px",
          marginRight: "16px",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="Google Logo"
          src="assets/google-logo.png"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    }
    sx={{
      backgroundColor: "#4285F4",
      color: "#fff",
    }}
  >
    Google Sign In
  </Button>
);
