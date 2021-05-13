interface TypographyProps {
  type: "h1" | "h2" | "h3" | "lg" | "md" | "sm" | "xs";
}
export const Typography: React.FC<TypographyProps> = ({ children, type }) => {
  switch (type) {
    case "h1":
      return <h1 className="text-2xl font-bold mb-8">{children}</h1>;

    case "h2":
      return <h2 className="text-xl font-bold mb-2">{children}</h2>;

    case "h3":
      return <h3 className="text-lg font-bold mb-2">{children}</h3>;

    case "lg":
      return <span className="text-lg">{children}</span>;

    case "md":
      return <span className="text-base">{children}</span>;

    case "sm":
      return <span className="text-sm">{children}</span>;

    case "xs":
      return <span className="text-xs">{children}</span>;

    default:
      return <span>{children}</span>;
  }
};
