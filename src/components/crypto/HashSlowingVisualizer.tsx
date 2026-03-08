"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "../ui/CyberButton";
import { hashMD5, hashSimulatedSlow } from "@/lib/crypto/hash";
import { Clock, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export function HashSlowingVisualizer() {
  const [isHashing, setIsHashing] = useState(false);
  const [results, setResults] = useState<{md5: {time: number, hash: string} | null, argon: {time: number, hash: string} | null}>({
      md5: null,
      argon: null
  });

  const demoPassword = "mySecretPassword123";

  const runComparison = async () => {
      setIsHashing(true);
      setResults({ md5: null, argon: null });

      // Run MD5 (Instant)
      const md5Start = performance.now();
      const md5Hash = hashMD5(demoPassword);
      const md5End = performance.now();
      
      setResults(prev => ({...prev, md5: { time: md5End - md5Start, hash: md5Hash }}));

      // Run Slow Hash (Simulated Argon2/Bcrypt)
      const argonStart = performance.now();
      const argonHash = await hashSimulatedSlow(demoPassword);
      const argonEnd = performance.now();

      setResults(prev => ({...prev, argon: { time: argonEnd - argonStart, hash: argonHash }}));
      setIsHashing(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-muted/10 border border-border rounded-xl font-mono">
        <h3 className="text-xl font-bold mb-4 text-center text-foreground">MD5 vs Argon2 Speed Test</h3>
        <p className="text-sm text-center text-muted-foreground mb-8">
            Why are fast algorithms bad for passwords? Click below to hash <strong className="text-primary">{demoPassword}</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* MD5 Column */}
            <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-lg flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 text-red-400 font-bold">
                    <ShieldAlert size={18} /> MD5 (Fast)
                </div>
                
                <div className="h-24 flex items-center justify-center w-full">
                    {results.md5 ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                            <div className="text-2xl font-bold text-red-500 mb-1">
                                {results.md5.time.toFixed(2)} ms
                            </div>
                            <div className="text-xs text-muted-foreground truncate w-48 mx-auto" title={results.md5.hash}>
                                {results.md5.hash}
                            </div>
                        </motion.div>
                    ) : isHashing ? (
                        <span className="text-muted-foreground">Waiting...</span>
                    ) : (
                        <span className="text-muted-foreground">Ready</span>
                    )}
                </div>
                {results.md5 && (
                    <div className="text-xs text-center text-red-400/80 mt-2">
                        A hacker can guess billions of these per second.
                    </div>
                )}
            </div>

            {/* Argon2 Column */}
            <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg flex flex-col items-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                    <ShieldCheck size={18} /> Argon2 (Slow by Design)
                </div>

                <div className="h-24 flex items-center justify-center w-full z-10">
                    {results.argon ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                            <div className="text-2xl font-bold text-primary mb-1">
                                {Math.round(results.argon.time)} ms
                            </div>
                            <div className="text-xs text-muted-foreground truncate w-48 mx-auto" title={results.argon.hash}>
                                {results.argon.hash}
                            </div>
                        </motion.div>
                    ) : isHashing && results.md5 ? (
                        <motion.div className="flex flex-col items-center text-primary">
                            <Loader2 className="animate-spin mb-2" size={24} />
                            <span className="text-xs animate-pulse">Computing memory-hard hash...</span>
                        </motion.div>
                    ) : (
                        <span className="text-muted-foreground">Ready</span>
                    )}
                </div>

                {/* Simulated filling background for Argon2 */}
                <AnimatePresence>
                    {isHashing && results.md5 && !results.argon && (
                        <motion.div 
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="absolute bottom-0 left-0 right-0 bg-primary/10 origin-bottom"
                            style={{ top: "40%" }}
                        />
                    )}
                </AnimatePresence>

                {results.argon && (
                    <div className="text-xs text-center text-primary/80 mt-2 z-10">
                        Slows down hackers to only a few guesses per second.
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify-center flex-col items-center gap-3">
            <CyberButton onClick={runComparison} disabled={isHashing}>
                {isHashing ? "Running Test..." : "Run Hashing Race"}
            </CyberButton>
            {results.argon && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold flex items-center gap-2">
                    <Clock size={16} className="text-accent" />
                    Argon2 was ~{Math.round(results.argon.time / Math.max(0.1, results.md5!.time))}x slower. This is a Feature!
                </motion.div>
            )}
        </div>
    </div>
  );
}
