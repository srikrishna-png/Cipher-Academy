import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Shield, HelpCircle, Hash } from "lucide-react";

export default function RandomnessPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">11</span>
                <h4 className="text-foreground/60 font-mono tracking-widest uppercase m-0">Module 11 — Randomness & Entropy</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">The Engine of Chance</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                Without true randomness, cryptography is impossible. If a secret key can be predicted, even the strongest algorithm in the world will fail.
            </p>

            <h2>🎲 PRNG vs TRNG</h2>
            <p>
                Computers are deterministic. They follow rules. Because of this, generating "true" random numbers is actually very difficult.
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-muted/30 border border-border p-6 rounded-2xl">
                    <h4 className="font-bold text-accent mb-2 flex items-center gap-2">
                        <Zap size={18} /> PRNG (Pseudo-Random)
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Uses a mathematical formula starting from a <strong>Seed</strong>.
                        If you know the seed and the algorithm, you can predict every single "random" number.
                    </p>
                    <div className="mt-4 p-3 bg-black/40 rounded-lg text-[10px] font-mono text-accent/80">
                        x[n+1] = (a * x[n] + c) mod m
                    </div>
                    <p className="text-[10px] text-red-500 mt-2 font-bold uppercase italic tracking-tighter">Not for Keys!</p>
                </div>

                <div className="bg-primary/5 border border-primary/30 p-6 rounded-2xl">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                        <Shield size={18} /> TRNG (True Random)
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Derived from physical entropy: keystroke timing, atmospheric noise, or radioactive decay.
                        There is no mathematical pattern to predict.
                    </p>
                    <div className="mt-4 p-3 bg-black/40 rounded-lg text-[10px] font-mono text-primary/80">
                        entropy = collect_physical_noise()
                    </div>
                    <p className="text-[10px] text-primary mt-2 font-bold uppercase italic tracking-tighter">Gold Standard</p>
                </div>
            </div>

            <h2>🧬 CS-PRNG: The Cryptographer's Choice</h2>
            <p>
                Since TRNGs are slow, we use <strong>Cryptographically Secure Pseudo-Random Number Generators (CS-PRNGs)</strong>.
                These are PRNGs that are mathematically proven to be indistinguishable from true randomness.
            </p>

            <div className="not-prose bg-muted/20 dark:bg-black/40 border border-border dark:border-white/5 p-8 rounded-3xl my-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={180} />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground dark:text-white mb-6">⚙️ Implementation: Entropy Engine</h3>
                <p className="text-sm text-muted-foreground mb-8">
                    Our Entropy tool calculates <strong>Shannon's Entropy</strong> to measure the information density of your data.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold text-sm">H</div>
                            <div>
                                <h5 className="font-bold text-sm text-foreground dark:text-white mb-1">Theoretical Uncertainty</h5>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    We measure bits-per-character. A string of all "AAAAA" has <strong>0 bits</strong> of entropy.
                                    A truly random string has <strong>8 bits</strong> per byte.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-primary font-mono text-xs uppercase font-bold tracking-widest">Logic Flow</h4>
                        <div className="space-y-2">
                            <span className="text-[10px] text-foreground dark:text-white">Extract frequency of every unique byte.</span>
                            <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                                <span className="text-[10px] font-mono text-primary">02</span>
                                <span className="text-[10px] text-foreground dark:text-white">Apply log2 summation formula.</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-white/5 rounded border border-white/5">
                                <span className="text-[10px] font-mono text-primary">03</span>
                                <span className="text-[10px] text-foreground dark:text-white">Scale output based on character set.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2>💡 Brute Force & Entropy</h2>
            <p>
                Entropy directly determines how long it takes to crack a secret. Every 1 bit of entropy doubling the search space.
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="p-6 bg-muted/20 border border-border rounded-2xl">
                    <h4 className="font-bold text-foreground dark:text-white mb-4">Small Example: Simple Pin</h4>
                    <p className="text-sm text-muted-foreground mb-4">"1234" (4 digits). Only digits used.</p>
                    <div className="h-2 w-full bg-red-500/20 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-red-500 w-[5%]" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-red-400">
                        <span>Entropy: ~13 bits</span>
                        <span>Cracked: Insant</span>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                    <h4 className="font-bold text-foreground dark:text-white mb-4">Large Example: Secure Passphrase</h4>
                    <p className="text-sm text-muted-foreground mb-4">"correct-horse-battery-staple" (Complex string).</p>
                    <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-primary w-[95%]" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-primary">
                        <span>Entropy: ~80+ bits</span>
                        <span>Cracked: Trillions of Years</span>
                    </div>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/keygen" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 pb-8">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Key Generation
                </Link>
                <Link href="/learn/steganography" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors mb-8">
                    Next: Steganography <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div >
    );
}
