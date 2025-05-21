import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1536px] px-4 md:px-20 lg:px-[120px]",
        className,
      )}
    >
      {children}
    </div>

    //   Previous Version
    /*<div
      className={cn(
        "mx-auto w-full max-w-[343px] md:max-w-[664px] lg:max-w-[80%] 2xl:max-w-[1280px]",
        className
      )}
    >
      {children}
    </div>*/
  );
};
