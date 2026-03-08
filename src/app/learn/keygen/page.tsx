import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Zap, Key, Cpu } from "lucide-react";

export default function KeyGenerationPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">10</span>
                <h4 className="text-slate-200 font-mono tracking-widest uppercase m-0">Module 10 — Key Generation</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">🏗️ Key Generation: The Prime Search</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                RSA and ECC security depends entirely on the difficulty of factoring Large Primes. Generating these keys is one of the most computationally expensive tasks in cryptography.
            </p>

            <h2>🔎 How to Find a Prime Number</h2>
            <p>
                There is no mathematical formula to "generate" a 2048-bit prime number. Instead, we generate a <strong>random number</strong> and test if it is prime. If it isn't, we increment and test again.
            </p>

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl my-16 group relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(16,185,129,0.1)_0%,transparent_100%)]" />
                <h3 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                    🏗️ Implementation: The Primality Pipeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                        <h5 className="text-[10px] font-bold text-primary uppercase mb-2 tracking-widest">1. Entropy Pooling</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            We collect randomness from mouse movements, CPU timings, and <code>crypto.getRandomValues()</code> to seed a CSPRNG.
                        </p>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                        <h5 className="text-[10px] font-bold text-primary uppercase mb-2 tracking-widest">2. Sieve of Eratosthenes</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            We quickly filter out candidates divisible by the first 500 small primes (2, 3, 5, 7, 11...). This discards 90% of candidates instantly.
                        </p>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                        <h5 className="text-[10px] font-bold text-primary uppercase mb-2 tracking-widest">3. Miller-Rabin Test</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            A probabilistic test. We run 40 rounds of modular exponentiation. If a number passes, the chance it's NOT prime is less than 1 in 2<sup>80</sup>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="bg-muted/10 border border-border p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-primary mb-4 flex items-center gap-2">
                        <Cpu size={20} /> RSA vs ECC Cost
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        RSA keys are significantly larger and harder to generate than Elliptic Curve keys for the same level of security.
                    </p>
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white">RSA-4096 Generation:</span>
                            <span className="text-red-400">~2,500ms</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white">P-256 Generation (ECC):</span>
                            <span className="text-green-400">~15ms</span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                    <h5 className="text-xs font-bold text-white mb-3 uppercase tracking-widest">The "Key Trapdoor"</h5>
                    <p className="text-[10px] text-muted-foreground mb-4 italic">
                        The public key is the product <code>n = p * q</code>. The private key is derived using the Euler Totient <code>φ(n)</code>. Finding <code>p</code> and <code>q</code> from <code>n</code> is what makes RSA secure.
                    </p>
                    <div className="bg-muted/5 p-3 rounded font-mono text-[9px] text-yellow-500/80">
                // Prime Count:<br />
                        Number of 1024-bit primes: ~10<sup>300</sup><br />
                        (More than the atoms in the universe)
                    </div>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/jwt-studio" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: JWT Studio
                </Link>
                <Link href="/learn/randomness" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Next: Randomness <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
