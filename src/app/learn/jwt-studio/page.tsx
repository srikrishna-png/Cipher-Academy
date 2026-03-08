import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Zap, Cpu, Code } from "lucide-react";

export default function JWTStudioPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">09</span>
                <h4 className="text-slate-200 font-mono tracking-widest uppercase m-0">Module 9 — JWT Studio</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">JWT Studio: Token Architecture</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. They are the backbone of modern web authentication.
            </p>

            <h2>🏗️ The Anatomy of a Token</h2>
            <p>
                A JWT consists of three parts separated by dots (<code>.</code>): Header, Payload, and Signature. Each part is Base64URL encoded to ensure it can be safely included in HTTP headers or URL parameters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-accent mb-4 flex items-center gap-2">
                        <Code size={20} /> Implementation Logic
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center shrink-0">
                                <span className="text-accent font-bold text-xs">P.1</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs uppercase text-white mb-1">State Vectorization</h5>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">
                                    We take the JavaScript object (Claims) and stringify it. This JSON string is then converted into a UTF-8 Byte Array.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center shrink-0">
                                <span className="text-accent font-bold text-xs">P.2</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs uppercase text-white mb-1">Base64URL Compaction</h5>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">
                                    Unlike standard Base64, we remove padding (<code>=</code>) and replace <code>+</code>/<code>/</code> to ensure the token doesn't break URL structures.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center shrink-0">
                                <span className="text-accent font-bold text-xs">P.3</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs uppercase text-white mb-1">Signing Pass</h5>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">
                                    The Header and Payload strings are concatenated. This "Data Segment" is then put through an HMAC-SHA256 or RSA-SHA256 function.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/60 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                    <h5 className="text-xs font-bold text-white mb-4 uppercase tracking-[0.2em] text-center">Compact Serialization Demo</h5>
                    <div className="bg-muted/10 p-4 rounded border border-white/5 font-mono text-[9px] text-primary/70 mb-4 animate-pulse">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9<span className="text-red-400">.</span>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyNTE2MjM5MDIyfQ<span className="text-red-400">.</span>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[8px] font-bold uppercase tracking-tighter">
                        <div className="text-blue-400">Header</div>
                        <div className="text-purple-400">Payload</div>
                        <div className="text-green-400">Signature</div>
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-6 text-center italic">
                        <strong>Security Note:</strong> The Header and Payload are NOT encrypted. Anyone who sees the token can read your claims. The Signature only proves they weren't changed.
                    </p>
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl my-16 group relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(16,185,129,0.1)_0%,transparent_100%)]" />
                <h3 className="text-2xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                    ⚡ Large vs Small Benchmark
                </h3>
                <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
                    JWT performance is highly dependent on the number of claims (Payload size) and the complexity of the signing algorithm.
                </p>

                <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                            <span>Micro Auth (Sub, Iat) ~150 chars</span>
                            <span className="text-primary">~0.01ms</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[2%]" /></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                            <span>Heavy Payload (Permissions, Avatars, Roles) ~5KB</span>
                            <span className="text-yellow-400">~1.2ms</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[40%]" /></div>
                    </div>
                    <p className="text-[9px] text-muted-foreground italic leading-relaxed pt-2">
                        <strong>Bottleneck:</strong> At very large payload sizes (10KB+), the token becomes too large for HTTP headers (usually 8KB limit). This forces the use of "Stateful" sessions or Chunked JWTs.
                    </p>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/digital-signatures" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Digital Signatures
                </Link>
                <Link href="/learn/keygen" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Next: Key Generation <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
