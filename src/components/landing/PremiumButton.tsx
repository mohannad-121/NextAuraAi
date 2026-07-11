import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
};

export function PremiumLink({
  children,
  variant = "primary",
  arrow = true,
  className = "",
  ...props
}: AnchorProps) {
  return (
    <a
      className={`premium-button ${variant === "secondary" ? "premium-button-secondary" : "premium-button-primary"} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
      ) : null}
    </a>
  );
}
