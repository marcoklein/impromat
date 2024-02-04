declare global {
  declare module "@mui/material/styles" {
    interface Palette {
      like: Palette["primary"];
    }

    interface PaletteOptions {
      like?: PaletteOptions["primary"];
    }
  }
  declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      custom: true;
    }
  }
  // TODO override props for
  declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      like: true;
    }
  }
  declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
      like: true;
    }
  }
  declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
      like: true;
    }
  }
}
