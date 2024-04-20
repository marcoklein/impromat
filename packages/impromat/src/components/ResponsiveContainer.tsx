import { Box } from "@mui/system";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  size?: "sm" | "md" | "lg";
}

export const ResponsiveContainer: React.FC<ContainerProps> = ({
  children,
  size,
}) => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box maxWidth={size ?? "sm"} width="100%">
        {children}
      </Box>
    </Box>
  );
};
