"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Shield, BookOpen, KeyRound } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/tools/text-crypto", label: "Tools", icon: Shield },
    { href: "/learn/history", label: "Academy", icon: BookOpen },
    { href: "/escape-room", label: "Challenge", icon: KeyRound },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary text-primary-foreground font-bold font-mono group-hover:animate-pulse">
          CA
        </div>
        <span className="font-mono font-bold tracking-tighter text-lg hidden sm:block">
          Cipher<span className="text-primary opacity-80">Academy_</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-1 sm:gap-4 absolute left-1/2 -translate-x-1/2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href.split('/')[1] ? `/${link.href.split('/')[1]}` : link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:block">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
