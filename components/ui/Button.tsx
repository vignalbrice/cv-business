import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-linear-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 focus:ring-purple-500 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5":
              variant === "primary",
            "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 focus:ring-purple-400":
              variant === "secondary",
            "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-purple-500":
              variant === "outline",
            "text-gray-600 hover:text-purple-700 hover:bg-purple-50":
              variant === "ghost",
            "bg-linear-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 focus:ring-yellow-400 shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5":
              variant === "gold",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3.5 text-base": size === "lg",
            "px-10 py-4 text-lg": size === "xl",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button };
