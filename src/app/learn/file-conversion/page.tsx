import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, Zap, Box } from "lucide-react";

export default function FileConversionPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">05</span>
                <h4 className="text-foreground/60 font-mono tracking-widest uppercase m-0">Module 5 — File Conversion</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">The Data Transformer: Binary & String Pipelines</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                Working with files in the browser requires a complex pipeline to bridge the gap between <strong>Binary Blobs</strong> and <strong>Cryptographic Vectors</strong>.
            </p>

            <h2>🏗️ The Blueprint: 3-Stage Vectorization</h2>
            <p>
                Standard cryptographic libraries like CryptoJS work with mathematical arrays (WordArrays), while your computer's hard drive stores raw binary bits. To encrypt a file, we must transform it through three distinct stages to prevent data corruption.
            </p>

            <div className="not-prose bg-primary/5 border border-primary/20 p-8 rounded-3xl my-16 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={180} className="rotate-45" />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground dark:text-white mb-6 flex items-center gap-3">
                    <Box className="text-primary" size={24} /> The Implementation Pipeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                        <h5 className="text-xs font-bold text-primary uppercase tracking-widest">Stage 1: Base64 Forcing</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            We use <code>FileReader.readAsDataURL()</code>. This forces binary bytes (0-255) into an ASCII-safe string. This prevents <strong>Null-Byte Corruption</strong> where binary data crashes standard string parsers.
                        </p>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                        <h5 className="text-xs font-bold text-primary uppercase tracking-widest">Stage 2: Word Packing</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            The Base64 string is parsed into <strong>32-bit Words</strong>. Bitwise shift operations pack 4 bytes into one machine word, creating the high-performance vector used by the cipher.
                        </p>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                        <h5 className="text-xs font-bold text-primary uppercase tracking-widest">Stage 3: Blob Reconstruction</h5>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            After decryption, the DataURL is parsed. The MIME header (e.g. <code>image/png</code>) tells the <code>Blob</code> constructor how to rebuild the original file structure.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                <div className="bg-muted/10 border border-border p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-primary mb-4">💎 Storage Strategy</h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        When storing encrypted files in our <strong>File Vault</strong>, we store the metadata (filename and size) as part of the encrypted payload itself. This ensures that even if an attacker gets the database, they don't know the file name or type.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-[9px] text-primary/60">
            // Encrypted Structure:<br />
                        &#123;<br />
                        &nbsp;&nbsp;meta: "image/png",<br />
                        &nbsp;&nbsp;data: "U29tZSBlbmNyeXB0ZWQgYml0cw=="<br />
                        &#125;
                    </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold font-mono text-foreground dark:text-white mb-4">🚀 Load Benchmark</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Small Profile (64KB)</span>
                                <span className="text-primary">~2ms</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[3%]" /></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Full HD Movie (50MB)</span>
                                <span className="text-red-400">Memory Failure</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-red-400 w-[95%]" /></div>
                        </div>
                        <p className="text-[8px] text-muted-foreground italic leading-relaxed pt-2">
                            <strong>Technical Bottleneck:</strong> The browser has a "String Limit." A 50MB file expands by ~33% in Base64 (~67M chars). Most browsers will throw an out-of-memory error if trying to process a 100MB+ file using the single-string method.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose flex justify-between">
                <Link href="/learn/symmetric" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Symmetric
                </Link>
                <Link href="/learn/asymmetric" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Next: Asymmetric & RSA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
