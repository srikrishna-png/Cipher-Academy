"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export function GlitchText({ text, className = "", delay = 0 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initial reveal animation
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iter) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iter >= text.length) {
        clearInterval(interval);
      }
      iter += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  const handleHover = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iter) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iter >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      iter += 1 / 2; // Faster on hover
    }, 20);
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={handleHover}
      className={`inline-block font-mono cursor-default relative group ${className}`}
    >
        {displayText}
        {/* Subtle chromatic aberration effect on hover */}
        <span className="absolute top-0 left-[1px] -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse">{displayText}</span>
        <span className="absolute top-0 -left-[1px] -z-10 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse">{displayText}</span>
    </motion.span>
  );
}
