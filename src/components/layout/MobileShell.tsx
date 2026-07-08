import { type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  showNav?: boolean;
  bg?: string;
  className?: string;
  contentPadBottom?: boolean;
}

export function MobileShell({ children, showNav = true, bg, className, contentPadBottom = true }: Props) {
  return (
    <div className={cn("min-h-dvh w-full", bg)}>
      <div
        className={cn(
          "mx-auto min-h-dvh w-full max-w-[480px]",
          contentPadBottom && showNav && "pb-28",
          className
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
