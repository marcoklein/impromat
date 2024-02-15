import { Box, Skeleton } from "@mui/material";

/**
 * Card Layout with text skeletons.
 */
export const LoadingCard: React.FC = () => (
  <Box height="100%">
    <Skeleton height="100%" animation="wave" />
  </Box>
);
