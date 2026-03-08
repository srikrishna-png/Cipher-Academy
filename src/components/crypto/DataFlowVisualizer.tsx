"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "../ui/CyberButton";
import { Play, RotateCcw } from "lucide-react";

// A real 4x4 AES state (16 hex bytes) - represents "HELLO WORLD!!!!!" in hex
const INITIAL_STATE: string[][] = [
  ["48", "20", "4F", "21"],
  ["65", "57", "52", "21"],
  ["6C", "6F", "4C", "21"],
  ["6C", "72", "44", "21"],
];

// After SubBytes (S-Box substitution of above values)
const SUBBYTES_STATE: string[][] = [
  ["52", "B7", "63", "FD"],
  ["9F", "D6", "52", "FD"],
  ["4F", "A0", "EB", "FD"],
  ["4F", "A0", "1A", "FD"],
];

// After ShiftRows (each row rotated left)
const SHIFTROWS_STATE: string[][] = [
  ["52", "B7", "63", "FD"],  // row 0: no shift
  ["D6", "52", "FD", "9F"],  // row 1: shift left 1
  ["EB", "FD", "4F", "A0"],  // row 2: shift left 2
  ["FD", "4F", "A0", "1A"],  // row 3: shift left 3
];

// After MixColumns (column mixing — values become diffused)
const MIXCOLS_STATE: string[][] = [
  ["C4", "42", "23", "E2"],
  ["9F", "63", "FA", "3C"],
  ["B0", "45", "3A", "D8"],
  ["7E", "11", "62", "9F"],
];

// After AddRoundKey (XOR with a round key — final output)
const ADDRK_STATE: string[][] = [
  ["A1", "2F", "DC", "08"],
  ["4B", "E7", "23", "9A"],
  ["3E", "B1", "F5", "6C"],
  ["9C", "D4", "17", "70"],
];

const STEPS = [
  {
    name: "Initial State",
    state: INITIAL_STATE,
    color: "border-muted-foreground/40",
    cellColor: "bg-muted/30 text-foreground border-muted-foreground/20",
    desc: "The 16-byte plaintext is loaded into a 4×4 byte grid called the State. AES always works on exactly 128 bits at a time.",
    badge: "bg-muted/30 text-muted-foreground",
  },
  {
    name: "SubBytes",
    state: SUBBYTES_STATE,
    color: "border-yellow-500/50",
    cellColor: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
    desc: "Each of the 16 bytes is individually replaced using a fixed 256-entry lookup table (the S-Box). This introduces non-linearity — without it, AES could be broken with simple linear algebra.",
    badge: "bg-yellow-500/20 text-yellow-400",
  },
  {
    name: "ShiftRows",
    state: SHIFTROWS_STATE,
    color: "border-blue-500/50",
    cellColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    desc: "Row 0 stays in place. Row 1 rotates left by 1. Row 2 rotates left by 2. Row 3 rotates left by 3. This shuffles the bytes across all four columns.",
    badge: "bg-blue-500/20 text-blue-400",
  },
  {
    name: "MixColumns",
    state: MIXCOLS_STATE,
    color: "border-purple-500/50",
    cellColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    desc: "Each column of 4 bytes is multiplied by a fixed matrix in GF(2⁸) — Galois Field arithmetic. A single byte change in one column is spread across all 4 bytes, achieving diffusion.",
    badge: "bg-purple-500/20 text-purple-400",
  },
  {
    name: "AddRoundKey",
    state: ADDRK_STATE,
    color: "border-primary/50",
    cellColor: "bg-primary/10 text-primary border-primary/30",
    desc: "The state is XOR'd with a 128-bit round key derived from the original secret key (via the AES Key Schedule). This is the only step that incorporates the key — it's where the 'secret' is injected.",
    badge: "bg-primary/20 text-primary",
  },
];

function StateGrid({ state, cellColor, prevState, isAnimating }: {
  state: string[][];
  cellColor: string;
  prevState?: string[][];
  isAnimating: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {state.flatMap((row, r) =>
        row.map((cell, c) => {
          const changed = prevState && prevState[r][c] !== cell;
          return (
            <motion.div
              key={`${r}-${c}`}
              initial={isAnimating && changed ? { scale: 1.3, opacity: 0 } : { scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: isAnimating && changed ? (r * 4 + c) * 0.04 : 0, ease: "backOut" }}
              className={`relative flex flex-col items-center justify-center rounded-lg border font-mono text-center aspect-square
                ${cellColor}
                ${isAnimating && changed ? "ring-2 ring-white/40" : ""}
              `}
            >
              <span className="text-[10px] opacity-40 leading-none mb-0.5">[{r},{c}]</span>
              <span className="text-sm font-bold leading-none">{cell}</span>
            </motion.div>
          );
        })
      )}
    </div>
  );
}

export function DataFlowVisualizer() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = STEPS[step];
  const prev = step > 0 ? STEPS[step - 1] : undefined;

  const goTo = (n: number) => {
    setIsAnimating(true);
    setStep(n);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    if (step >= STEPS.length - 1) { setIsPlaying(false); return; }
    const t = setTimeout(() => goTo(step + 1), 1800);
    return () => clearTimeout(t);
  }, [isPlaying, step]);

  const reset = () => { setIsPlaying(false); goTo(0); };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-black/50 border border-border rounded-2xl font-mono">
      <h3 className="text-lg font-bold mb-1 text-center">AES Block Cipher — Round Visualizer</h3>
      <p className="text-xs text-muted-foreground text-center mb-6">
        16-byte (128-bit) state matrix transformed through one AES round
      </p>

      {/* Step pills */}
      <div className="flex justify-center gap-1.5 mb-6 flex-wrap">
        {STEPS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => goTo(i)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all border
              ${i === step
                ? `${s.badge} border-transparent scale-105`
                : "text-muted-foreground border-border hover:border-primary/50"}`}
          >
            {i === step && <span className="mr-1">▶</span>}{s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">

        {/* Previous state (ghost) */}
        <div className="flex flex-col gap-2">
          {prev ? (
            <>
              <div className="text-xs text-muted-foreground text-center mb-1">
                Before: <span className="text-foreground font-bold">{prev.name}</span>
              </div>
              <div className="opacity-35 pointer-events-none">
                <StateGrid state={prev.state} cellColor="bg-muted/20 text-muted-foreground border-muted/30" isAnimating={false} />
              </div>
            </>
          ) : (
            <div className="opacity-0 pointer-events-none">
              <StateGrid state={current.state} cellColor="" isAnimating={false} />
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="hidden md:flex flex-col items-center justify-center pt-10 gap-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="text-2xl text-primary">→</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${current.badge}`}>
                {current.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Current state (live) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs text-center mb-1">
            After: <span className="font-bold text-white">{current.name}</span>
          </div>
          <div className={`p-2.5 rounded-xl border-2 transition-colors duration-500 ${current.color}`}>
            <StateGrid
              state={current.state}
              cellColor={current.cellColor}
              prevState={prev?.state}
              isAnimating={isAnimating}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-6 p-4 rounded-xl border text-sm text-foreground/85 leading-relaxed ${current.color} bg-white/[0.02]`}
        >
          <span className={`font-bold font-mono mr-2 px-2 py-0.5 rounded text-xs ${current.badge}`}>
            {current.name}
          </span>
          {current.desc}
        </motion.div>
      </AnimatePresence>

      {/* Changed cells legend */}
      {prev && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground justify-center">
          <span className="w-3 h-3 rounded border-2 border-white/40 bg-white/10 inline-block" />
          Highlighted cells changed from the previous step
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 px-3 py-2 rounded-lg transition-all"
        >
          <RotateCcw size={13} /> Reset
        </button>

        <CyberButton
          onClick={() => { if (step < STEPS.length - 1) goTo(step + 1); }}
          disabled={step >= STEPS.length - 1}
          variant="secondary"
          className="px-6 py-2 text-sm h-auto"
        >
          Next Step →
        </CyberButton>

        <CyberButton
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={step >= STEPS.length - 1 && !isPlaying}
          className="px-6 py-2 text-sm h-auto"
        >
          <Play size={14} className="mr-1.5" />
          {isPlaying ? "Playing…" : "Auto Play"}
        </CyberButton>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {STEPS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-primary w-5" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
