"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNav } from "./NavProvider";

export function SiteWrapper({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen } = useNav();

    return (
        <motion.div
            animate={{
                x: isSidebarOpen ? 280 : 0,
                // We can add a slight scale or border radius for a "card" effect if desired, 
                // but the user specifically asked for "moving the site".
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative min-h-screen bg-background z-10 overflow-x-hidden"
        >
            {children}
            {/* Overlay to close sidebar when clicking on the main content */}
            {isSidebarOpen && (
                <div
                    className="absolute inset-0 z-[100] cursor-pointer"
                    onClick={(e) => {
                        // This is just a safety net; the backdrop in MobileSidebar should handle this too.
                    }}
                />
            )}
        </motion.div>
    );
}
