"use client";

import { useState, useEffect } from "react";
import { analyzePassword, EntropyResult } from "@/lib/crypto/entropy";
import { ShieldAlert, Fingerprint, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EntropyPage() {
    const [password, setPassword] = useState("");
    const [entropy, setEntropy] = useState<EntropyResult | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (password) {
                setEntropy(analyzePassword(password));
            } else {
                setEntropy(null);
            }
        }, 150); // Small debounce

        return () => clearTimeout(timer);
    }, [password]);

    const getScoreColor = (score: number) => {
        switch(score) {
            case 0: return "bg-red-500";
            case 1: return "bg-orange-500";
            case 2: return "bg-yellow-500";
            case 3: return "bg-lime-500";
            case 4: return "bg-green-500";
            default: return "bg-muted";
        }
    };

    const getScoreTextClass = (score: number) => {
        switch(score) {
            case 0: return "text-red-500";
            case 1: return "text-orange-500";
            case 2: return "text-yellow-500";
            case 3: return "text-lime-500";
            case 4: return "text-green-500";
            default: return "text-muted-foreground";
        }
    };

    const getScoreLabel = (score: number) => {
        switch(score) {
            case 0: return "Extremely Weak";
            case 1: return "Weak";
            case 2: return "Moderate";
            case 3: return "Strong";
            case 4: return "Uncrackable";
            default: return "No Password";
        }
    };

    return (
        <div className="flex flex-col gap-12 max-w-4xl mx-auto items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center justify-center gap-3">
                    <Fingerprint size={32} /> Live Entropy Analysis
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                    Type a password to test how fast an offline attacker could crack it. 
                    Uses pattern matching against leaks and dictionaries.
                </p>
            </div>

            <div className="w-full relative max-w-2xl">
                <input
                    type="text"
                    placeholder="Type a password to test..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-20 bg-background border-2 border-border rounded-xl px-6 font-mono text-2xl text-center focus:outline-none focus:border-primary transition-colors shadow-lg shadow-black/5"
                />
                
                {/* Visual Progress Bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-6">
                    <motion.div 
                        className={`h-full ${entropy ? getScoreColor(entropy.score) : "bg-transparent"}`}
                        initial={{ width: 0 }}
                        animate={{ width: entropy ? `${(entropy.score + 1) * 20}%` : "0%" }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {entropy && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            
                            {/* Stats Card */}
                            <div className="bg-muted/20 border border-border p-6 rounded-xl">
                                <h3 className={`text-2xl font-bold font-mono mb-6 ${getScoreTextClass(entropy.score)}`}>
                                    {getScoreLabel(entropy.score)}
                                </h3>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase flex items-center gap-1 mb-1"><Clock size={12}/> Offline Crack Time</span>
                                        <div className="font-mono text-lg">{entropy.crackTimeDisplay}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase flex gap-1 mb-1 justify-start"><ShieldAlert size={12}/> Analysis Time</span>
                                        <div className="font-mono text-sm">{entropy.calcTimeMs} ms</div>
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Card */}
                            <div className="bg-background border border-border p-6 rounded-xl flex flex-col justify-start">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Live Feedback</h3>
                                
                                {entropy.feedback.warning ? (
                                    <div className="text-red-500 text-sm flex items-start gap-2 bg-red-500/10 p-3 rounded-md border border-red-500/20 mb-4">
                                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                        <span>{entropy.feedback.warning}</span>
                                    </div>
                                ) : (
                                    <div className="text-green-500 text-sm flex items-start gap-2 bg-green-500/10 p-3 rounded-md border border-green-500/20 mb-4">
                                        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                                        <span>No obvious red flags detected.</span>
                                    </div>
                                )}

                                {entropy.feedback.suggestions.length > 0 && (
                                    <ul className="list-disc pl-4 text-sm text-foreground space-y-2 marker:text-accent">
                                        {entropy.feedback.suggestions.map((sug, i) => (
                                            <li key={i}>{sug}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
