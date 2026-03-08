import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Zap, Lock, Key } from "lucide-react";

export default function DiffieHellmanPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">07</span>
                <h4 className="text-slate-200 font-mono tracking-widest uppercase m-0">Module 7 — Diffie-Hellman</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">Diffie-Hellman: The Cryptographic Handshake</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                Diffie-Hellman (DH) is a protocol that allows two parties to create a <strong>shared secret</strong> over an insecure channel, without ever transmitting the secret itself.
            </p>

            <h2>🎨 The Color Analogy</h2>
            <p>
                Imagine Alice and Bob start with a shared "public color" (e.g. Yellow).
            </p>
            <ol className="list-decimal pl-6 space-y-2">
                <li>Alice picks a <strong>secret color</strong> (e.g. Red) and mixes it with Yellow to get Orange. She sends Orange to Bob.</li>
                <li>Bob picks a <strong>secret color</strong> (e.g. Blue) and mixes it with Yellow to get Green. He sends Green to Alice.</li>
                <li>Alice mixes her secret Red into Bob's Green to get <strong>Brown</strong>.</li>
                <li>Bob mixes his secret Blue into Alice's Orange to get <strong>Brown</strong>.</li>
            </ol>
            <p>
                An observer (Eve) sees Yellow, Orange, and Green, but she cannot "un-mix" them to find the secret colors or the final Brown.
            </p>

            <div className="not-prose bg-black/40 border border-white/5 p-8 rounded-3xl my-16 group relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={180} className="-rotate-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={24} /> The Handshake Logic (Math)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-6">
                        <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl">
                            <h5 className="font-bold text-xs uppercase tracking-widest text-primary mb-3">Mathematical Foundation</h5>
                            <div className="font-mono text-sm text-white/90 space-y-2">
                                <p>Public: Prime <span className="text-primary">p</span>, Base <span className="text-primary">g</span></p>
                                <p>Alice's Secret: <span className="text-primary">a</span></p>
                                <p>Bob's Secret: <span className="text-primary">b</span></p>
                            </div>
                        </div>
                        <div className="bg-muted/10 border border-border p-5 rounded-xl font-mono text-xs space-y-3">
                            <p className="text-white">Alice computes: A = g<sup>a</sup> mod p</p>
                            <p className="text-white">Bob computes: B = g<sup>b</sup> mod p</p>
                            <div className="pt-2 border-t border-white/5">
                                <p className="text-accent">Shared Secret = B<sup>a</sup> mod p = A<sup>b</sup> mod p</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Implementation Breakdown</h4>
                        <div className="space-y-2">
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-white">1. Parameter Agreement</span>
                                <span className="text-[10px] text-green-500 font-mono">P-256 / P-384</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-white">2. Public Key Exchange</span>
                                <span className="text-[10px] text-blue-500 font-mono">Over TCP/TLS</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-white">3. Derivation Pass (KDF)</span>
                                <span className="text-[10px] text-purple-500 font-mono">HKDF-SHA256</span>
                            </div>
                        </div>
                        <p className="text-[9px] text-muted-foreground italic mt-4 leading-relaxed">
                            Modern implementations use <strong>EC-Diffie-Hellman (ECDH)</strong>, which uses Elliptic Curves instead of modular exponentiation for 10x smaller key sizes with equal security.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-red-400 mb-4 flex items-center gap-2">
                        <Shield size={20} /> The MITM Vulnerability
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        Standard Diffie-Hellman is <strong>not authenticated</strong>. An attacker (Eve) can sit in the middle and perform two separate handshakes: one with Alice and one with Bob. Alice thinks Eve is Bob, and Bob thinks Eve is Alice.
                    </p>
                    <div className="p-3 bg-black/40 rounded border border-red-500/20 text-[9px] font-mono text-red-500/80">
                        Fix: Use Digital Signatures or long-term public keys to verify the identity of the person you are handshaking with.
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-white mb-4">🌀 Large vs Small Benchmark</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Curve25519 Handshake (ECDH)</span>
                                <span className="text-primary">~0.7ms</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[5%]" /></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>DH-4096 (Classical RSA-style)</span>
                                <span className="text-yellow-400">~140ms</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[65%]" /></div>
                        </div>
                        <p className="text-[8px] text-muted-foreground italic leading-relaxed pt-2">
                            <strong>Technical Detail:</strong> Classical Diffie-Hellman with a 4096-bit prime is extremely slow because it requires hundreds of massive multiplication and modulo operations. Curve-based math is 200x more efficient.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/asymmetric" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Asymmetric
                </Link>
                <Link href="/learn/digital-signatures" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Next: Digital Signatures <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
