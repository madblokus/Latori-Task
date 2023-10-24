import React from "react";

type TypographyProps = {
  variant: "heading" | "description";
  children: React.ReactNode;
  className?: string;
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  if (variant === "heading") {
    return <h1 className={`text-lg font-bold ${className}`}>{children}</h1>;
  }

  return <p className={`text-base ${className}`}>{children}</p>;
};

export default Typography;
