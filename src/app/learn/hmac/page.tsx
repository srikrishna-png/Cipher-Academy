import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Hash, Zap } from "lucide-react";

export default function HMACPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">03</span>
                <h4 className="text-foreground/60 font-mono tracking-widest uppercase m-0">Module 3 — HMAC Algorithms</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">HMAC: Hash-based Message Authentication</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                While standard hashing ensures <strong>Integrity</strong> (the data hasn't changed), HMAC ensures <strong>Authenticity</strong> (the data was sent by a trusted source holding a secret key).
            </p>

            <h2>🤝 The Purpose of HMAC</h2>
            <p>
                Imagine Alice sends a file and its SHA-256 hash to Bob. An attacker (Eve) can intercept the file, modify it, calculate a <em>new</em> hash for the modified file, and send both to Bob. Bob will see the hash matches the file and think it's authentic.
            </p>
            <p>
                <strong>HMAC solves this</strong> by requiring a 128-bit or 256-bit secret key to generate the hash. Without the key, Eve cannot generate a valid hash for her modified file.
            </p>

            <div className="not-prose bg-muted/40 border-l-4 border-primary p-8 rounded-r-3xl my-16 group relative overflow-hidden shadow-2xl shadow-black/40">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <Hash size={180} />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground dark:text-white mb-6">⚙️ Technical Blueprint: The Dual Pass</h3>
                <p className="text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                    HMAC doesn't just "salt" the message. It uses a sophisticated <strong>Dual-Pass</strong> construction to prevent Length Extension attacks.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-4">
                        <h4 className="text-primary font-mono text-xs uppercase font-bold tracking-widest">The Algorithm</h4>
                        <div className="bg-black/60 p-5 rounded-xl border border-white/5 font-mono text-[10px] text-primary/90 leading-relaxed shadow-inner">
                            HMAC = H(K XOR opad || H(K XOR ipad || M))
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            <strong>ipad (inner pad)</strong> = 0x36 repeat. <br />
                            <strong>opad (outer pad)</strong> = 0x5C repeat.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-primary font-mono text-xs uppercase font-bold tracking-widest">Implementation Steps</h4>
                        <div className="space-y-2">
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-foreground dark:text-white">1. Key Vectorization</span>
                                <span className="text-[10px] text-green-500 font-mono">B-bit padding</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-foreground dark:text-white">2. Inner Hash Pass</span>
                                <span className="text-[10px] text-blue-500 font-mono">XOR with ipad</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-foreground dark:text-white">3. Outer Hash Pass</span>
                                <span className="text-[10px] text-purple-500 font-mono">XOR with opad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-primary mb-4">📦 Large vs Small Demo</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Small API Header (128 bytes)</span>
                                <span className="text-primary">~0.05ms</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[1%]" /></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Large Binary Blob (10MB)</span>
                                <span className="text-yellow-400">~180ms</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[75%]" /></div>
                        </div>
                        <p className="text-[9px] text-muted-foreground italic leading-relaxed">
                            Because HMAC performs <strong>two hashing passes</strong>, the cost is roughly 2x the time of a standard SHA-256 hash. For a 10MB file, this means processing 20MB of data through the internal compression functions.
                        </p>
                    </div>
                </div>

                <div className="bg-muted/10 border border-border p-6 rounded-2xl flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-foreground dark:text-white mb-2 uppercase tracking-widest">Why use HMAC over Signatures?</h4>
                    <p className="text-xs text-muted-foreground mb-4">
                        HMAC is <strong>symmetric</strong>. It is significantly faster than digital signatures (RSA/ECDSA). It is ideal for high-speed scenarios like internal API authentication or session tokens.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-[10px] text-blue-400/80">
                // Performance Check:<br />
                        HMAC-SHA256: 1.2M ops/sec<br />
                        RSA-2048 Sign: 800 ops/sec
                    </div>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/hashing" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Hashing
                </Link>
                <Link href="/learn/symmetric" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Next: Symmetric Encryption <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
