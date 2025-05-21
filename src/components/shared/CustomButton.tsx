"use client";

import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

/**
 * Enhanced Button Props Interface
 *
 * Extends the base button props with additional customization options.
 */
export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "size"> {
  /** The content of the button (required) */
  children: React.ReactNode;

  /** Icon component to display before the button text */
  leftIcon?: React.ReactNode;

  /** Icon component to display after the button text */
  rightIcon?: React.ReactNode;

  /** Custom text color override */
  textColor?: string;

  /** Custom font size (e.g. "text-sm", "text-lg") */
  fontSize?: string;

  /** Custom border radius (e.g. "rounded-lg", "rounded-full") */
  radius?: string;

  /** Custom padding override */
  padding?: string;

  /** Custom margin override */
  margin?: string;

  /** Scale up on hover (e.g. "hover:scale-105") */
  scaleUp?: string;

  /** Scale down on active/click (e.g. "active:scale-95") */
  scaleDown?: string;

  /** Additional transition effect */
  transition?: string;

  /** Button size ("default", "sm", "lg", "icon", "xl", "2xl") */
  size?: "default" | "sm" | "lg" | "icon" | "xl" | "2xl";

  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;

  /** Text to show during loading state */
  loadingText?: string;

  /** Makes the button take full width of parent */
  isFullWidth?: boolean;

  /** Custom shadow (e.g. "shadow-lg", "shadow-xl") */
  shadow?: string;

  /** Font weight (e.g. "font-semibold", "font-bold") */
  fontWeight?: string;

  /** Custom background color */
  bgColor?: string;

  /** Custom background color on hover */
  hoverBgColor?: string;

  /** Custom text color on hover */
  hoverTextColor?: string;

  /** Custom cursor type (e.g. "cursor-pointer", "cursor-not-allowed") */
  cursor?: string;

  /** Custom border color */
  borderColor?: string;

  /** Custom border color on hover */
  hoverBorderColor?: string;

  /** Custom opacity on hover (e.g. "hover:opacity-90") */
  hoverOpacity?: string;

  /** Underline effect on hover (e.g. "hover:underline") */
  hoverUnderline?: boolean;

  /** Custom ring/focus effect (e.g. "focus:ring-2", "focus:ring-blue-500") */
  focusRing?: string;

  /** Custom ring color (e.g. "#3B82F6" or "rgb(59, 130, 246)") */
  ringColor?: string;

  /** Animation on hover (e.g. "hover:animate-pulse") */
  hoverAnimation?: string;
}

/**
 * Enhanced Button Component
 *
 * A highly customizable button built on top of shadcn's Button component.
 * Provides extensive style customization without modifying the base component.
 *
 * Features:
 * - Left and right icons support
 * - Custom text color, font size, border radius
 * - Custom padding and margin
 * - Scale effects on hover/active states
 * - Loading state with spinner
 * - Full width option
 * - Custom shadow and font weight
 * - Custom background color and hover effects
 * - Hover animations and cursor styling
 * - Focus ring and ring color customization
 * - All base shadcn button variants
 */
const CustomButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      leftIcon,
      rightIcon,
      textColor,
      fontSize,
      radius,
      padding,
      margin,
      scaleUp,
      scaleDown,
      transition = "transition-all duration-200",
      isLoading = false,
      loadingText,
      isFullWidth = false,
      shadow,
      fontWeight,
      bgColor,
      hoverBgColor,
      hoverTextColor,
      cursor = "cursor-pointer",
      borderColor,
      hoverBorderColor,
      hoverOpacity,
      hoverUnderline,
      focusRing,
      ringColor,
      hoverAnimation,
      disabled,
      style = {},
      ...props
    },
    ref,
  ) => {
    // Define the sizes that will be passed to the shadcn button
    const sizeMap = {
      default: "default",
      sm: "sm",
      lg: "lg",
      icon: "icon",
      // Additional sizes are handled via custom classes
      xl: "lg", // Use lg as base but will be enhanced with custom classes
      "2xl": "lg", // Use lg as base but will be enhanced with custom classes
    } as const;

    // Custom classes based on props
    const customClasses = cn(
      // Font size
      fontSize,

      // Border radius
      radius,

      // Padding (if specified)
      padding,

      // Margin (if specified)
      margin,

      // Scale effects
      scaleUp,
      scaleDown,

      // Transition
      transition,

      // Full width
      isFullWidth && "w-full",

      // Shadow
      shadow,

      // Font weight
      fontWeight,

      // Cursor type
      cursor,

      // Hover effects
      hoverTextColor,
      hoverBgColor,
      hoverBorderColor,
      hoverOpacity,
      hoverUnderline && "hover:underline",
      focusRing,
      ringColor && !focusRing && "focus:ring-2 focus:ring-offset-2",
      hoverAnimation,

      // Size-specific additional classes
      size === "xl" && "h-12 text-base px-8",
      size === "2xl" && "h-14 text-lg px-10",
    );

    // Custom inline styles
    const customStyles = {
      ...style,
      ...(textColor ? { color: textColor } : {}),
      ...(bgColor ? { backgroundColor: bgColor } : {}),
      ...(borderColor
        ? { borderColor: borderColor, borderWidth: "1px", borderStyle: "solid" }
        : {}),
      ...(ringColor
        ? ({ "--tw-ring-color": ringColor, "--ring-color": ringColor } as any)
        : {}),
    };

    return (
      <ShadcnButton
        className={cn(customClasses, className)}
        variant={variant}
        size={sizeMap[size] || "default"}
        disabled={disabled || isLoading}
        style={customStyles}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
          </>
        )}
      </ShadcnButton>
    );
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
