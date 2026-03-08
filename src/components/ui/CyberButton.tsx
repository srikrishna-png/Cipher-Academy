"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CyberButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export function CyberButton({
  children,
  onClick,
  className,
  variant = "primary",
  disabled = false,
}: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-medium transition-colors overflow-hidden rounded-md";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]",
    secondary: "bg-transparent text-foreground border border-border hover:bg-muted",
    danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Glitch Overlay Effect on Hover */}
      {!disabled && variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[-45deg]"
          whileHover={{
            x: ["-150%", "150%"],
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
