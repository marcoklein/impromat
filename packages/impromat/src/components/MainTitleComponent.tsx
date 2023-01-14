import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {}

export const MainTitleComponent: React.FC<ContainerProps> = ({ children }) => (
  <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>{children}</h1>
);
