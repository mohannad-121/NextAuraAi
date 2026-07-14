import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type CinematicCardProps = ComponentPropsWithoutRef<"article">;

export function CinematicCard({ className, ...props }: CinematicCardProps) {
  return <article className={cn("cinematic-card", className)} {...props} />;
}
