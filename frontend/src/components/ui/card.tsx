import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  radius?: "lg" | "xl";
  edge?: boolean;
}

// Notion's elevation is barely-there: level 1 is a flat white card defined
// only by a hairline; level 2 lifts the same white surface with a soft,
// many-layer shadow; level 3 is an inset/nested tile using the warm paper
// tone, for content living inside another card.
const surfaceByLevel = {
  1: "bg-surface-1 border border-hairline",
  2: "bg-surface-1 border border-hairline shadow-elevation-1",
  3: "bg-surface-2 border border-hairline",
};

const radiusClass = {
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function Card({
  className,
  level = 1,
  radius = "lg",
  edge: _edge,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(surfaceByLevel[level], radiusClass[radius], className)}
      {...props}
    />
  );
}
