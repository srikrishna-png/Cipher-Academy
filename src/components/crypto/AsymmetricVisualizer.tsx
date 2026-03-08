"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "../ui/CyberButton";
import { User, Key, KeyRound, Lock, Unlock, Send, Mail } from "lucide-react";

export function AsymmetricVisualizer() {
  const [stage, setStage] = useState(0);

  // Constants
  const AliceColor = "text-accent";
  const BobColor = "text-primary";

  const nextStage = () => {
    if (stage < 4) setStage(stage + 1);
    else setStage(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-black/40 border border-border rounded-2xl font-mono relative">
      <h3 className="text-xl font-bold mb-12 text-center text-foreground">The Mailbox Analogy (RSA / ECC)</h3>

      <div className="flex justify-between items-start relative h-64">
        
        {/* Alice (Sender) */}
        <div className="flex flex-col items-center gap-4 w-1/3 z-10">
          <div className={`p-4 rounded-full bg-accent/10 border border-accent/30 ${AliceColor}`}>
            <User size={32} />
          </div>
          <span className="font-bold">Alice</span>
          
          <div className="h-24 flex flex-col items-center justify-start gap-2">
            <AnimatePresence>
              {stage >= 2 && stage < 4 && (
                <motion.div 
                  key="alice-lock"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className={`flex items-center gap-1 text-xs ${BobColor} bg-primary/10 px-2 py-1 rounded`}
                >
                   <Lock size={12} /> Bob's Lock
                </motion.div>
              )}
              {stage === 3 && (
                <motion.div 
                  key="alice-message"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="px-3 py-2 bg-white text-black text-xs rounded-md shadow-[0_0_10px_white] z-20"
                >
                  <Lock size={14} className="inline mr-1" />
                  "Hello Bob!"
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The Network (Middle Area) */}
        <div className="flex-1 relative h-full flex flex-col items-center justify-start pt-12">
            
            {/* Stage 1: Bob sends Lock to Alice */}
            <AnimatePresence mode="wait">
                {stage === 1 && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: -100, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className={`flex flex-col items-center ${BobColor}`}
                    >
                        <Lock size={32} />
                        <span className="text-xs mt-2 text-center whitespace-nowrap">Sending Public Key<br/>(The Open Lock)</span>
                    </motion.div>
                )}

                {/* Stage 3: Alice sends Locked Message to Bob */}
                {stage === 3 && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 100, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="flex flex-col items-center text-white"
                    >
                        <div className="relative">
                            <Mail size={40} />
                            <Lock size={16} className={`absolute -bottom-1 -right-1 ${BobColor} bg-black rounded-full`} />
                        </div>
                        <span className="text-xs mt-2 text-center">Sending Ciphertext</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Eavesdropper warning */}
            {stage === 3 && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                 className="absolute bottom-0 text-xs text-red-500/80 text-center animate-pulse"
               >
                   Hacker cannot read this. Only Bob has the Key to open Bob's Lock.
               </motion.div>
            )}
        </div>

        {/* Bob (Receiver) */}
        <div className="flex flex-col items-center gap-4 w-1/3 z-10">
          <div className={`p-4 rounded-full bg-primary/10 border border-primary/30 ${BobColor}`}>
            <User size={32} />
          </div>
          <span className="font-bold">Bob</span>

          <div className="h-24 flex flex-col items-center justify-start gap-2">
            <AnimatePresence>
              {stage >= 0 && (
                <motion.div 
                  key="bob-private-key"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-1 text-xs ${BobColor} bg-primary/10 px-2 py-1 rounded`}
                >
                   <KeyRound size={12} /> Bob's Private Key
                </motion.div>
              )}
              {(stage === 0 || stage === 1) && (
                <motion.div 
                  key="bob-public-lock"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className={`flex items-center gap-1 text-xs ${BobColor} bg-primary/10 px-2 py-1 rounded mt-1`}
                >
                   <Lock size={12} /> Bob's Public Lock
                </motion.div>
              )}
              {stage === 4 && (
                <motion.div 
                  key="bob-decrypted"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="px-3 py-2 bg-white text-black text-xs rounded-md shadow-[0_0_20px_#10b981] z-20 border border-primary"
                >
                  <Unlock size={14} className="inline mr-1 text-primary" />
                  "Hello Bob!"
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-center">
            <CyberButton onClick={nextStage} variant={stage === 4 ? "secondary" : "primary"}>
                {stage === 0 && "1. Bob Creates Keys"}
                {stage === 1 && "2. Send Lock to Alice"}
                {stage === 2 && "3. Alice Locks Message"}
                {stage === 3 && "4. Send to Bob"}
                {stage === 4 && "Reset Simulation"}
            </CyberButton>
        </div>
    </div>
  );
}
