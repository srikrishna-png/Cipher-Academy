import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Lock } from "lucide-react";
import { DataFlowVisualizer } from "@/components/crypto/DataFlowVisualizer";

export default function SymmetricPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">04</span>
        <h4 className="text-primary font-mono tracking-widest uppercase m-0">Module 4 — Symmetric Encryption</h4>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">Symmetric Encryption</h1>

      <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
        Symmetric encryption uses a <strong>single shared secret key</strong> for both locking (encrypting) and unlocking (decrypting) data. Whoever holds the key can read the data — no one else can.
      </p>

      <h2>🔐 The Key Exchange Problem</h2>
      <p>
        Symmetric encryption's fundamental weakness is distribution. Imagine Alice wants to send a secret to Bob. She locks the message with a key. But how does Bob get the key? If she sends it over the internet, an eavesdropper (Eve) could intercept it and then read every future message.
      </p>
      <p>
        This is the <strong>Key Exchange Problem</strong>, and it plagued cryptography for centuries until the invention of public-key cryptography in 1976. Today, protocols like <strong>TLS handshakes</strong> use asymmetric encryption to safely exchange a temporary symmetric key, then use symmetric encryption for the actual data (because it's hundreds of times faster).
      </p>

      <h2>🔲 Block Ciphers: Chopping Data into Pieces</h2>
      <p>
        Modern symmetric ciphers are <strong>block ciphers</strong>. Instead of processing the data character-by-character, they chop the entire message into fixed-size chunks (blocks) and encrypt each block through a series of mathematical operations called <em>rounds</em>.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 hover:bg-red-500/20 transition-colors">
          <h4 className="font-bold font-mono text-red-400 mb-2 flex items-center gap-2">
            <Lock size={16} /> DES
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Data Encryption Standard. Modern computers can brute-force its 56-bit key in hours.</p>
          <li className="text-red-500 font-bold uppercase mt-2">Status: Broken</li>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 hover:bg-primary/20 transition-colors">
          <h4 className="font-bold font-mono text-primary mb-2 flex items-center gap-2">
            <Shield size={16} /> AES
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Advanced Encryption Standard. The gold standard for global security and speed.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>🔑 128/256-bit Key</li>
            <li>📦 128-bit Block</li>
            <li>🔄 10-14 Rounds</li>
            <li className="text-primary font-bold uppercase mt-2">Status: Military Grade</li>
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 hover:bg-yellow-500/20 transition-colors">
          <h4 className="font-bold font-mono text-yellow-400 mb-2 flex items-center gap-2">
            <Shield size={16} /> 3DES
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Triple DES. Applies DES three times with different keys to increase security.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>🔑 168-bit Key</li>
            <li>📦 64-bit Block</li>
            <li>🔄 48 Rounds</li>
            <li className="text-yellow-500 font-bold uppercase mt-2">Status: Legacy</li>
          </ul>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 hover:bg-purple-500/20 transition-colors">
          <h4 className="font-bold font-mono text-purple-400 mb-2 flex items-center gap-2">
            <Lock size={16} /> RC4
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">A stream cipher once used in WEP/SSL. Famous for its speed but high biases.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>🔑 Variable Key</li>
            <li>📦 Stream-based</li>
            <li>🔄 PRGA Logic</li>
            <li className="text-red-500 font-bold uppercase mt-2">Status: Insecure</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 hover:bg-blue-500/20 transition-colors">
          <h4 className="font-bold font-mono text-blue-400 mb-2 flex items-center gap-2">
            <Lock size={16} /> Rabbit
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">A high-speed stream cipher designed for high-performance software environments.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>🔑 128-bit Key</li>
            <li>📦 64-bit State</li>
            <li>🔄 8 Rounds</li>
            <li className="text-blue-400 font-bold uppercase mt-2">Status: Specialized</li>
          </ul>
        </div>
      </div>

      <h2>🧩 Inside AES: The Four Operations</h2>
      <p>
        In each round, AES applies four mathematical transformations to a 4×4 grid of bytes (the "state"):
      </p>

      <div className="not-prose space-y-4 my-6">
        {[
          {
            step: "1. SubBytes",
            color: "border-yellow-500/40 bg-yellow-500/5",
            label: "text-yellow-400",
            desc: "Each byte in the 16-byte state is replaced with a corresponding value from a fixed lookup table (S-Box). This adds non-linearity — without it, AES would be easily broken with linear algebra."
          },
          {
            step: "2. ShiftRows",
            color: "border-blue-500/40 bg-blue-500/5",
            label: "text-blue-400",
            desc: "Each row of the 4×4 grid is cyclically shifted left by its row number (row 0: no shift, row 1: 1 left, row 2: 2 left, row 3: 3 left). This ensures column mixing in the next step."
          },
          {
            step: "3. MixColumns",
            color: "border-purple-500/40 bg-purple-500/5",
            label: "text-purple-400",
            desc: "Each column is multiplied by a fixed matrix in GF(2⁸) (Galois Field). This provides diffusion — spreading a change in one byte across the whole column, amplified across rounds."
          },
          {
            step: "4. AddRoundKey",
            color: "border-primary/40 bg-primary/5",
            label: "text-primary",
            desc: "The state is XOR'd with the round key (derived from the original key via the AES key schedule). Without knowing the key, this step is impossible to reverse — it's the actual 'secret' injection."
          }
        ].map((op) => (
          <div key={op.step} className={`p-5 rounded-xl border ${op.color} flex gap-4`}>
            <div className={`font-mono font-bold text-sm mt-0.5 w-28 shrink-0 ${op.label}`}>{op.step}</div>
            <p className="text-sm text-muted-foreground dark:text-foreground/80">{op.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Visualizer */}
      <div className="my-16 not-prose">
        <DataFlowVisualizer />
      </div>

      <h2>🔀 Modes of Operation</h2>
      <p>
        Encrypting a single 128-bit block is straightforward. But what about large files or streaming data? AES <strong>modes of operation</strong> define how to chain multiple block encryptions together:
      </p>

      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-3 font-mono text-primary">Mode</th>
              <th className="text-left p-3">Full Name</th>
              <th className="text-left p-3">IV Needed?</th>
              <th className="text-left p-3">Parallelisable?</th>
              <th className="text-left p-3">Use Case</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            <tr className="border-b border-border/50">
              <td className="p-3 text-red-400">ECB</td>
              <td className="p-3">Electronic Codebook</td>
              <td className="p-3 text-red-500">No</td>
              <td className="p-3 text-primary">Yes</td>
              <td className="p-3 text-red-500">Never — patterns leak</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="p-3 text-yellow-400">CBC</td>
              <td className="p-3">Cipher Block Chaining</td>
              <td className="p-3 text-primary">Yes</td>
              <td className="p-3 text-red-500">No (sequential)</td>
              <td className="p-3">File encryption</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="p-3 text-primary">CTR</td>
              <td className="p-3">Counter Mode</td>
              <td className="p-3 text-primary">Yes (nonce)</td>
              <td className="p-3 text-primary">Yes</td>
              <td className="p-3">Stream encryption</td>
            </tr>
            <tr>
              <td className="p-3 text-primary">GCM</td>
              <td className="p-3">Galois/Counter Mode</td>
              <td className="p-3 text-primary">Yes (nonce)</td>
              <td className="p-3 text-primary">Yes</td>
              <td className="p-3 font-bold text-primary">TLS, HTTPS — Gold standard</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="not-prose bg-red-500/10 border border-red-500/30 p-5 rounded-xl my-6">
        <h4 className="text-red-400 font-mono font-bold mb-2">⚠️ The ECB Penguin Problem</h4>
        <p className="text-sm text-muted-foreground dark:text-foreground/80">
          ECB mode is famously broken — each block is encrypted independently, so identical plaintext blocks produce identical ciphertext blocks. Encrypting an image with ECB reveals the image's shapes and patterns in the ciphertext. Modern systems never use ECB.
        </p>
      </div>

      {/* Technical Data Expansion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
            <Shield size={20} /> Algorithm Matrix
          </h3>
          <div className="overflow-hidden border border-border rounded-xl">
            <table className="w-full text-left text-[10px] font-mono">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 border-b border-border">Cipher</th>
                  <th className="p-3 border-b border-border">Key Size</th>
                  <th className="p-3 border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-muted/10">
                  <td className="p-3">AES-256</td>
                  <td className="p-3">256 bits</td>
                  <td className="p-3 text-green-400 font-bold tracking-tighter">SECURE</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/10">
                  <td className="p-3">ChaCha20</td>
                  <td className="p-3">256 bits</td>
                  <td className="p-3 text-green-400 font-bold tracking-tighter">SECURE</td>
                </tr>
                <tr className="border-b border-border hover:bg-muted/10">
                  <td className="p-3">TripleDES</td>
                  <td className="p-3">168 bits</td>
                  <td className="p-3 text-yellow-500 font-bold tracking-tighter">LEGACY</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-3">RC4</td>
                  <td className="p-3">128 bits</td>
                  <td className="p-3 text-red-500 font-bold tracking-tighter">BROKEN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
            <Lock size={20} /> AES Round Logic
          </h3>
          <div className="bg-muted/10 border border-border p-5 rounded-xl space-y-4">
            <div className="flex gap-4 items-start border-l-2 border-primary pl-4">
              <div>
                <p className="font-bold text-[10px] uppercase text-primary">01 SubBytes</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Replace bytes using S-Box for non-linearity.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-2 border-primary/60 pl-4">
              <div>
                <p className="font-bold text-[10px] uppercase text-primary/80">02 ShiftRows</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Cyclic shift of rows for diffusion.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-2 border-primary/40 pl-4">
              <div>
                <p className="font-bold text-[10px] uppercase text-primary/60">03 MixColumns</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Linear col transformation (Diffusion).</p>
              </div>
            </div>
            <div className="flex gap-4 items-start border-l-2 border-primary/20 pl-4">
              <div>
                <p className="font-bold text-[10px] uppercase text-primary/40">04 AddRoundKey</p>
                <p className="text-[10px] text-muted-foreground leading-tight">XOR with unique round subkey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>🌐 Real-World Applications</h2>
      <p>
        Symmetric encryption is the workhorse of the modern internet. Because it is computationally efficient, it handles the "heavy lifting" of encrypting large streams of data.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {[
          {
            title: "HTTPS / TLS",
            desc: "Once a secure connection is established, AES-256 encrypts every packet of data sent between your browser and the server.",
            icon: "🌐",
            color: "border-blue-500/30 bg-blue-500/5 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)]"
          },
          {
            title: "Disk Encryption",
            desc: "BitLocker and FileVault use AES-XTS to encrypt your entire hard drive, protecting data if your laptop is stolen.",
            icon: "💾",
            color: "border-purple-500/30 bg-purple-500/5 shadow-[0_0_15px_-5px_rgba(168,85,247,0.2)]"
          },
          {
            title: "Secure Messaging",
            desc: "WhatsApp and Signal use symmetric keys (derived via Double Ratchet) to encrypt the actual text and media of your chats.",
            icon: "💬",
            color: "border-green-500/30 bg-green-500/5 shadow-[0_0_15px_-5px_rgba(34,197,94,0.2)]"
          }
        ].map((item) => (
          <div key={item.title} className={`group p-5 rounded-xl border ${item.color} transition-all duration-300 hover:-translate-y-1 hover:border-primary/50`}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 opacity-group-hover:opacity-10 transition-opacity">
            <Lock size={120} />
          </div>
          <h3 className="text-xl font-bold font-mono text-primary mb-4">⚙️ Implementation: Symmetric Studio</h3>
          <p className="text-sm text-muted-foreground dark:text-foreground/80 mb-6 font-sans">
            Our Studio doesn't just encrypt text — it processes <strong>binary streams</strong>. Here is the exact logical pipeline used in the tool:
          </p>
          <div className="space-y-4 relative z-10">
            {[
              { t: "1. Ingestion", d: "Files are read via `FileReader` as DataURLs (Base64) to preserve binary integrity." },
              { t: "2. Vectorization", d: "Base64 is converted to a WordArray (CryptoJS format) for high-performance math." },
              { t: "3. Transform", d: "The chosen algorithm (e.g. AES-256) iterates over blocks with the secret key." },
              { t: "4. Reconstruction", d: "Decrypted DataURLs are parsed into binary Blobs and served via `URL.createObjectURL`." }
            ].map(s => (
              <div key={s.t} className="flex gap-4 items-start">
                <span className="text-primary font-mono font-bold text-xs">{s.t.split(".")[0]}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tight text-foreground/90 dark:text-white/90">{s.t.split(" ")[1]}</p>
                  <p className="text-[10px] text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/10 border border-border p-6 rounded-2xl">
          <h3 className="text-xl font-bold font-mono text-white mb-4">📦 Logic Demo: Process Weights</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Small Example (1KB Text)</span>
                <span className="text-primary">Instant (1ms)</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[5%]" />
              </div>
              <p className="text-[9px] text-muted-foreground">Direct string transform. Single block processing.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Large Example (5MB Image)</span>
                <span className="text-yellow-400">~120ms</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 w-[60%]" />
              </div>
              <p className="text-[9px] text-muted-foreground">Streamed via Base64. Memory usage spikes as buffer allocates 5.3 million characters before encrypting.</p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="bg-black/40 p-3 rounded-lg font-mono text-[9px] text-primary/80">
                <p>// Logic Check: AES Performance</p>
                <p>const buffer = file.size * 1.33; // Base64 Overhead</p>
                <p>const totalBlocks = buffer / 16; // 128-bit Blocks</p>
                <p>console.log("Processing " + totalBlocks + " blocks...");</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Vault Detailed Card */}
      <div className="not-prose bg-black/40 border border-white/5 p-8 rounded-3xl my-16 group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50" />
        <h3 className="text-2xl font-bold font-mono text-white mb-6">🔒 Tool Blueprint: The File Vault</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-primary font-mono text-sm uppercase font-bold tracking-widest">Storage Strategy</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard text boxes cannot store raw binary data (like images or PDF bytes) without corruption. The <strong>File Vault</strong> solves this by using <strong>DataURL Headers</strong>.
            </p>
            <div className="p-4 bg-muted/20 rounded-lg font-mono text-[10px] text-primary/70">
              data:image/png;base64,iVBORw0KGgoAAAANSUh...
            </div>
            <p className="text-[10px] text-muted-foreground italic">
              ^ This header is encrypted alongside the data, allowing the tool to know exactly what file type to reconstruct upon decryption.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-primary font-mono text-sm uppercase font-bold tracking-widest">Memory Management</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Encrypting large files (100MB+) requires careful memory usage. We use the <strong>Browser Chunker</strong> theory to process data as a single continuous string, ensuring zero data loss during the Base64 transform.
            </p>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[9px] font-mono whitespace-nowrap">CHUNK SIZE: AUTO</div>
              <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[9px] font-mono whitespace-nowrap">THREAD: MAIN (BLOCKING)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="not-prose bg-primary/5 border border-primary/20 p-5 rounded-xl my-6">
        <h4 className="text-primary font-mono font-bold mb-2">💡 Pro Tip: Hybrid Encryption</h4>
        <p className="text-sm text-muted-foreground dark:text-foreground/80">
          In practice, we almost never use just one type. We use <strong>Asymmetric</strong> encryption to safely share a secret key, then switch to <strong>Symmetric</strong> encryption to actually move the data. This combines the security of one with the speed of the other.
        </p>
      </div>

      <hr className="my-12 border-border" />

      <div className="not-prose flex justify-between">
        <Link href="/learn/hashing" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Hashing
        </Link>
        <Link href="/learn/file-conversion" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
          Next: File Conversion <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
