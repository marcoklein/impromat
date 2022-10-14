interface ContainerProps {
  code: string;
  squared?: boolean;
}

export const FlagIconComponent: React.FC<ContainerProps> = ({
  code,
  squared,
}) => <span className={`fi fi-${code} ${squared ? "fis" : ""}`}></span>;
