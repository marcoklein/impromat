import { useMemo } from "react";
import { useWindowDimensions } from "./use-window-dimensions";

export function useBreakpoints() {
  const { width } = useWindowDimensions();

  const breakpoints = useMemo(() => {
    const sm = width <= 576;
    const md = width <= 768;
    const lg = width <= 992;
    const xl = width > 992;

    return {
      sm,
      md,
      lg,
      xl,
    };
  }, [width]);

  return breakpoints;
}
