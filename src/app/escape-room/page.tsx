"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlitchText } from "@/components/ui/GlitchText";
import { Navbar } from "@/components/layout/Navbar";
import { hashMD5 } from "@/lib/crypto/hash";
import { encryptAES, decryptAES } from "@/lib/crypto/symmetric";
import { KeyRound, ShieldAlert, Cpu, Trophy, Lock, Undo2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function EscapeRoomPage() {
    const [stage, setStage] = useState(0); // 0 = Intro, 1 = Stage1, 2 = Stage2, 3 = Victory
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [error, setError] = useState("");

    // --- STAGE 1 LOGIC (Identify Hash) ---
    // The target word is "CYBER", whose MD5 is: f6c4c5ed50af7ed5845ce9b5c2d338f0
    const targetHash1 = hashMD5("CYBER"); 

    const checkStage1 = () => {
        if (input1.toUpperCase() === "CYBER") {
            setError("");
            setStage(2);
        } else {
            setError("Incorrect. Use the Text Crypto tool to generate MD5 hashes and find the match.");
        }
    };

    // --- STAGE 2 LOGIC (Symmetric Decryption) ---
    // We encrypt "ACCESS_GRANTED" with the key "enigma"
    // Users must use the Text Crypto tool to decrypt the ciphertext below with the key "enigma" to get the plaintext.
    const ciphertext2 = encryptAES("ACCESS_GRANTED", "enigma"); 

    const checkStage2 = () => {
        if (input2.toUpperCase() === "ACCESS_GRANTED") {
            setError("");
            setStage(3);
        } else {
            setError("Incorrect plaintext. Are you using AES and the key provided?");
        }
    };

    // --- STAGE 3 LOGIC (Asymmetric Password Generation) ---
    // User must generate a password. We check if it is >12 chars and has uppercase, lowercase, numbers, and symbols.
    // Instead of forcing them to use the generator component inline, we just validate string complexity here mimicking the generator output.
    const checkStage3 = () => {
        if (!input3) return setError("Enter a password.");
        if (input3.length < 12) return setError("Password must be at least 12 characters.");
        if (!/[A-Z]/.test(input3)) return setError("Missing Uppercase.");
        if (!/[a-z]/.test(input3)) return setError("Missing Lowercase.");
        if (!/[0-9]/.test(input3)) return setError("Missing Number.");
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input3)) return setError("Missing Symbol.");
        
        setError("");
        setStage(4); // Victory
        triggerConfetti();
    };


    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#10b981', '#06b6d4']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#10b981', '#06b6d4']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
        exit: { opacity: 0, scale: 1.05, y: -20, transition: { duration: 0.4 } }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary/30">
            <Navbar />
            
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full" />
                </div>

                <AnimatePresence mode="wait">
                    
                    {/* STAGE 0: Intro */}
                    {stage === 0 && (
                        <motion.div key="stage0" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="z-10 text-center max-w-2xl border border-red-500/30 bg-red-950/20 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                            <ShieldAlert size={64} className="text-red-500 mx-auto mb-6 opacity-80" />
                            <h1 className="text-4xl md:text-6xl font-black font-mono tracking-tighter mb-4 text-red-500">SYSTEM_LOCKDOWN</h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                A rogue AI has locked down the central mainframe. You must utilize the tools you built in the CipherAcademy to break the encryption and regain control.
                            </p>
                            <CyberButton onClick={() => setStage(1)} variant="danger" className="w-full text-xl py-6 rounded-full tracking-widest uppercase font-bold">
                                Initiate Override Sequence
                            </CyberButton>
                        </motion.div>
                    )}

                    {/* STAGE 1: Hash Collision Simulation */}
                    {stage === 1 && (
                        <motion.div key="stage1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="z-10 w-full max-w-2xl border border-border bg-black/50 p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-3 text-red-500 mb-6 border-b border-border/50 pb-4">
                                <Cpu /> <h2 className="text-2xl font-mono font-bold tracking-widest text-[#fff]">PHASE 1: THE HASH</h2>
                            </div>
                            
                            <p className="text-muted-foreground mb-6">
                                The system requires a specific word to authorize entry. We retrieved the MD5 hash of this word from the server logs:
                            </p>
                            
                            <div className="bg-muted text-primary font-mono p-4 rounded-lg break-all text-center text-sm md:text-base border border-border shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] mb-6 select-all">
                                {targetHash1}
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-lg text-sm mb-6 flex items-start gap-3">
                                <span>💡</span>
                                <span><strong>Hint:</strong> The target word is 5 letters long and relates to this app's overall theme. Use your <strong>Text Crypto Tool</strong> in another tab to generate MD5 hashes until you find a match.</span>
                            </div>

                            <input 
                                type="text" 
                                placeholder="Enter discovered plaintext..." 
                                value={input1} 
                                onChange={(e) => setInput1(e.target.value)}
                                className="w-full bg-background border border-border font-mono p-4 rounded-xl focus:outline-none focus:border-red-500 uppercase tracking-widest text-center text-xl mb-4"
                            />
                            
                            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
                            
                            <CyberButton onClick={checkStage1} className="w-full">Verify Payload</CyberButton>
                        </motion.div>
                    )}

                    {/* STAGE 2: Symmetric Decryption */}
                    {stage === 2 && (
                        <motion.div key="stage2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="z-10 w-full max-w-2xl border border-border bg-black/50 p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-3 text-cyan-500 mb-6 border-b border-border/50 pb-4">
                                <Lock /> <h2 className="text-2xl font-mono font-bold tracking-widest text-[#fff]">PHASE 2: THE CIPHER</h2>
                            </div>
                            
                            <p className="text-muted-foreground mb-6">
                                Bypassing the hash gate triggered a secondary lock. A transmission was intercepted, encrypted via <strong>AES</strong>.
                            </p>
                            
                            <div className="bg-muted text-cyan-400 font-mono p-4 rounded-lg break-all text-center text-sm md:text-base border border-border shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] mb-6 select-all">
                                {ciphertext2}
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-lg text-sm mb-6 flex flex-col gap-2">
                                <div className="flex items-start gap-3">
                                    <span>💡</span>
                                    <span><strong>Intel:</strong> We managed to extract the secret key used for encryption from memory. The key is:</span>
                                </div>
                                <code className="text-center font-bold text-lg tracking-widest text-white block mt-2 px-2 bg-black py-1 rounded w-fit mx-auto border border-blue-500/50">enigma</code>
                            </div>

                            <input 
                                type="text" 
                                placeholder="Enter decrypted message..." 
                                value={input2} 
                                onChange={(e) => setInput2(e.target.value)}
                                className="w-full bg-background border border-border font-mono p-4 rounded-xl focus:outline-none focus:border-cyan-500 uppercase tracking-widest text-center text-xl mb-4"
                            />
                            
                            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
                            
                            <div className="flex gap-4">
                                <CyberButton onClick={() => setStage(1)} variant="secondary" className="px-4"><Undo2 size={18} /></CyberButton>
                                <CyberButton onClick={checkStage2} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black border-none shadow-[0_0_15px_rgba(6,182,212,0.4)]">Decrypt Subsystem</CyberButton>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 3: Entropy Checker */}
                    {stage === 3 && (
                        <motion.div key="stage3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="z-10 w-full max-w-2xl border border-border bg-black/50 p-8 rounded-3xl backdrop-blur-md">
                            <div className="flex items-center gap-3 text-primary mb-6 border-b border-border/50 pb-4">
                                <KeyRound /> <h2 className="text-2xl font-mono font-bold tracking-widest text-[#fff]">PHASE 3: THE KEY DOCTRINE</h2>
                            </div>
                            
                            <p className="text-muted-foreground mb-6">
                                The rogue AI requires a new <strong>Administator Password</strong> to reset the mainframe. It evaluates password strength using strict cryptographic standards.
                            </p>
                            
                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-6">
                                <ul className="list-disc pl-5 text-sm space-y-2 marker:text-primary">
                                    <li>Minimum length of 12 characters.</li>
                                    <li>Must contain at least one uppercase letter (A-Z).</li>
                                    <li>Must contain at least one lowercase letter (a-z).</li>
                                    <li>Must contain at least one number (0-9).</li>
                                    <li>Must contain at least one special character (!@#$).</li>
                                </ul>
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 p-4 rounded-lg text-sm mb-6 flex items-start gap-3">
                                <span>💡</span>
                                <span><strong>Hint:</strong> Use the <strong>Key Generator</strong> tool to craft a secure password that passes these checks, or devise one yourself using the <strong>Entropy Tester</strong>.</span>
                            </div>

                            <input 
                                type="text" 
                                placeholder="Input Master Password..." 
                                value={input3} 
                                onChange={(e) => setInput3(e.target.value)}
                                className="w-full bg-background border border-border font-mono p-4 rounded-xl focus:outline-none focus:border-primary text-center text-xl mb-4"
                            />
                            
                            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
                            
                            <div className="flex gap-4">
                                <CyberButton onClick={() => setStage(2)} variant="secondary" className="px-4"><Undo2 size={18} /></CyberButton>
                                <CyberButton onClick={checkStage3} className="flex-1 text-black font-bold text-lg">Initialize Core Overwrite</CyberButton>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 4: VICTORY */}
                    {stage === 4 && (
                        <motion.div key="stage4" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="z-10 text-center max-w-2xl border border-primary/50 bg-primary/10 p-8 md:p-16 rounded-3xl backdrop-blur-md shadow-[0_0_100px_rgba(16,185,129,0.2)]">
                            <motion.div 
                                animate={{ y: [0, -20, 0] }} 
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                <Trophy size={80} className="text-primary mx-auto mb-8 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                            </motion.div>
                            
                            <GlitchText text="ACCESS_GRANTED" className="text-4xl md:text-5xl font-black font-mono tracking-tighter mb-4 text-white" />
                            
                            <p className="text-xl text-primary font-mono mt-4 mb-8">
                                SYSTEM OVERRIDE SUCCESSFUL.
                            </p>
                            <p className="text-muted-foreground mb-12">
                                Congratulations, Operator. You have successfully utilized text encryption, symmetric keys, and strong entropy generation to reclaim the mainframe.
                            </p>

                            <CyberButton onClick={() => window.location.href = "/"} variant="secondary" className="rounded-full shadow-lg">
                                Return to Head Quarters
                            </CyberButton>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
