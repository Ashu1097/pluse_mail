import type { Category } from "@/types";
import { CATEGORY_COLORS } from "@/constants/categories";
import { cn } from "@/lib/utils";

export function CategoryBadge({ category }: { category: Category }) {
  const c = CATEGORY_COLORS[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        c.bg,
        c.text
      )}
    >
      {category}
    </span>
  );
}
