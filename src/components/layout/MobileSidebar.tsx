"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, BookOpen, KeyRound, ChevronRight } from "lucide-react";
import { useNav } from "./NavProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const TOOLS_LIST = [
    { href: "/tools/text-crypto", label: "Text Cryptography" },
    { href: "/tools/steganography", label: "Steganography" },
    { href: "/tools/file-crypto", label: "File Cryptography" },
    { href: "/tools/entropy", label: "Password Entropy" },
    { href: "/tools/generators", label: "Key Generators" },
    { href: "/tools/jwt-inspector", label: "JWT Inspector" },
    { href: "/tools/digital-signatures", label: "Digital Signatures" },
    { href: "/tools/zip-compressor", label: "ZIP Compressor" },
];

const ACADEMY_LIST = [
    { href: "/learn/history", label: "History of Ciphers" },
    { href: "/learn/symmetric", label: "Symmetric Encryption" },
    { href: "/learn/asymmetric", label: "Asymmetric Encryption" },
    { href: "/learn/hashing", label: "Hashing Algorithms" },
    { href: "/learn/steganography", label: "Stego Concepts" },
    { href: "/learn/randomness", label: "Digital Randomness" },
    { href: "/learn/keygen", label: "Key Generation" },
    { href: "/learn/diffie-hellman", label: "Diffie-Hellman" },
    { href: "/learn/hmac", label: "HMAC & Security" },
    { href: "/learn/jwt-studio", label: "JWT Studio" },
    { href: "/learn/digital-signatures", label: "Sig Visualizer" },
    { href: "/learn/file-conversion", label: "Data Formats" },
];

export function MobileSidebar() {
    const { isSidebarOpen, closeSidebar } = useNav();
    const pathname = usePathname();

    const isToolsSection = pathname.startsWith("/tools");
    const isAcademySection = pathname.startsWith("/learn");

    const currentList = isToolsSection
        ? { title: "CRYPTO_SUITE", items: TOOLS_LIST, icon: Shield }
        : isAcademySection
            ? { title: "ACADEMY_SYLLABUS", items: ACADEMY_LIST, icon: BookOpen }
            : {
                title: "NAVIGATION", items: [
                    { href: "/tools/text-crypto", label: "Tools" },
                    { href: "/learn/history", label: "Academy" },
                    { href: "/escape-room", label: "Challenge" }
                ], icon: KeyRound
            };

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-background border-r border-border p-6 flex flex-col lg:hidden overflow-y-auto"
                    >
                        {/* Header / Logo */}
                        <div className="flex items-center justify-between mb-8">
                            <Link
                                href="/"
                                className="flex items-center gap-2 group"
                                onClick={closeSidebar}
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary text-primary-foreground font-bold font-mono group-hover:animate-pulse">
                                    CA
                                </div>
                                <span className="font-mono font-bold tracking-tighter text-lg leading-none">
                                    CipherAcademy
                                </span>
                            </Link>
                            <button
                                onClick={closeSidebar}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Context Header */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-2">
                                <currentList.icon className="w-3 h-3" />
                                {currentList.title}
                            </div>
                            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent" />
                        </div>

                        {/* Lists */}
                        <nav className="flex flex-col gap-1">
                            {currentList.items.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeSidebar}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-mono transition-all group",
                                            isActive
                                                ? "text-primary bg-primary/5"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <span>{link.label}</span>
                                        <ChevronRight className={cn(
                                            "w-4 h-4 opacity-0 -translate-x-2 transition-all",
                                            isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-50 group-hover:translate-x-0"
                                        )} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Status Footer */}
                        <div className="mt-auto pt-6 border-t border-border">
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Session</p>
                                <p className="text-xs font-mono text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    AUTH_L0CAL_HOST
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
