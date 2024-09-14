import { MouseEventHandler } from "react";

import { cn } from "~/lib/utils";

type CardProps = {
  onClick?: MouseEventHandler;
  isFlipped: boolean;
  isActive?: boolean;
  content: string | null;
};
export function Card({ onClick, isFlipped, isActive, content }: CardProps) {
  return (
    <div
      className={cn([
        "w-20 h-40",
        isActive ? "transition-transform -translate-y-10" : "",
      ])}
      role="presentation"
      onClick={onClick}
    >
      {isFlipped ? (
        <div
          className={cn([
            "w-full h-full",
            "flex items-center justify-center",
            "rounded-lg",
            "shadow-lg",
            "bg-blue-500 hover:bg-blue-700",
            "hover:cursor-pointer",
          ])}
        >
          <h1 className="text-2xl">{content || "NONE"}</h1>
        </div>
      ) : (
        <div
          className={cn([
            "w-full h-full",
            "flex items-center justify-center",
            "rounded-lg",
            "shadow-lg",
            "bg-red-500 hover:bg-red-700",
            "hover:cursor-pointer",
          ])}
        />
      )}
    </div>
  );
}
