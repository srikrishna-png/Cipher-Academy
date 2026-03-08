import Link from "next/link";
import { ArrowLeft, ArrowRight, Flag, Shield, Lock, Key, Zap } from "lucide-react";
import { AsymmetricVisualizer } from "@/components/crypto/AsymmetricVisualizer";

export default function AsymmetricPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">06</span>
        <h4 className="text-slate-200 font-mono tracking-widest uppercase m-0">Module 6 — Asymmetric Cryptography</h4>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">Public-Key Cryptography</h1>

      <p className="lead text-xl text-muted-foreground border-l-4 border-accent pl-4 py-2 not-prose">
        Public-key cryptography solved one of the greatest problems in the history of mathematics: <em>how do two strangers securely communicate over an untrusted channel without meeting in advance?</em>
      </p>

      <h2>🤔 The Key Distribution Problem</h2>
      <p>
        With symmetric encryption, Alice and Bob need to agree on a shared secret key. But if their communication channel (email, internet) is insecure, how do they share the key? A courier? A second encrypted channel? It's a chicken-and-egg problem that stymied cryptographers for centuries.
      </p>

      <h2>💡 Diffie-Hellman: The Breakthrough (1976)</h2>
      <p>
        Whitfield Diffie and Martin Hellman published an astonishing 1976 paper introducing <strong>public-key cryptography</strong>. Their "Diffie-Hellman Key Exchange" lets two parties agree on a shared secret over a completely public channel — even if an eavesdropper hears every message.
      </p>

      <div className="not-prose bg-muted/30 border border-border p-6 rounded-xl my-6">
        <h4 className="font-mono font-bold text-accent mb-4">🎨 The Colour Mixing Analogy</h4>
        <p className="text-sm text-muted-foreground mb-4">Imagine paint colours instead of numbers. Mixing colours is easy; un-mixing is practically impossible.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-400 mx-auto mb-3 shadow-[0_0_15px_rgba(250,204,21,0.4)]" />
            <div className="font-bold text-yellow-400 mb-1">Public Colour</div>
            <div className="text-muted-foreground">Agreed publicly (e.g. Yellow). Everyone knows this.</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="flex justify-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
              <div className="w-12 h-12 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
            </div>
            <div className="font-bold mb-1">Private Colours</div>
            <div className="text-muted-foreground">Alice picks Blue (secret). Bob picks Red (secret).</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-4 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.6)]" style={{ background: "conic-gradient(from 0deg, #3b82f6, #ef4444, #eab308, #10b981)" }} />
            <div className="font-bold text-primary mb-1">Shared Secret</div>
            <div className="text-muted-foreground">Both mix public + private → same final colour. Eve can't unmix it.</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">In real DH, "mixing" is modular exponentiation — trivial to compute, but reversing it (the discrete logarithm problem) is computationally infeasible.</p>
      </div>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 hover:bg-accent/20 transition-all group">
          <h4 className="font-bold font-mono text-accent mb-3 flex items-center gap-2">
            <Key size={18} /> RSA Algorithm
          </h4>
          <p className="text-sm text-foreground/80 mb-4">The first public-key system. Security is based on the difficulty of factoring large integers.</p>
          <div className="space-y-2 opacity-80 font-mono text-[10px]">
            <div className="flex justify-between"><span>Primary Strength:</span><span>Large Prime Math</span></div>
            <div className="flex justify-between"><span>Legacy Usage:</span><span>PGP, SSL, SSH</span></div>
            <div className="flex justify-between"><span>Recommended Size:</span><span>2048 - 4096 bits</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
            <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-[4px] text-[9px] font-bold">STABLE</span>
            <span className="px-2 py-0.5 bg-white/5 text-muted-foreground rounded-[4px] text-[9px] font-bold">HARDWARE-SUPPORTED</span>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 hover:bg-primary/20 transition-all group">
          <h4 className="font-bold font-mono text-primary mb-3 flex items-center gap-2">
            <Key size={18} /> ECDSA / ECC
          </h4>
          <p className="text-sm text-foreground/80 mb-4">Elliptic Curve Digital Signature Algorithm. Smaller keys, higher efficiency, same security.</p>
          <div className="space-y-2 opacity-80 font-mono text-[10px]">
            <div className="flex justify-between"><span>Primary Strength:</span><span>Curve Point Ops</span></div>
            <div className="flex justify-between"><span>Modern Usage:</span><span>TLS 1.3, Bitcoin, Signal</span></div>
            <div className="flex justify-between"><span>Recommended Size:</span><span>256 - 521 bits</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-[4px] text-[9px] font-bold">FAST</span>
            <span className="px-2 py-0.5 bg-white/5 text-muted-foreground rounded-[4px] text-[9px] font-bold">IOT-READY</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="my-16 not-prose">
        <AsymmetricVisualizer />
      </div>

      <h2>🔢 RSA: The Mathematics</h2>
      <p>
        RSA's security relies on the <strong>Integer Factorization Problem</strong>: it is easy to multiply two large prime numbers together, but given their product, finding the original primes is computationally infeasible at large scales.
      </p>

      <div className="not-prose bg-muted border border-border p-6 rounded-xl my-6 font-mono text-sm">
        <h4 className="text-accent font-bold mb-4">⚡ RSA Key Generation (Simplified)</h4>
        <ol className="space-y-3 text-foreground/80 list-decimal pl-5">
          <li>Pick two large prime numbers: <span className="text-primary">p = 61, q = 53</span></li>
          <li>Compute n = p × q: <span className="text-primary">n = 3233</span> (the modulus, public)</li>
          <li>Compute Euler's totient: <span className="text-primary">φ(n) = (p−1)(q−1) = 3120</span></li>
          <li>Choose e such that 1 &lt; e &lt; φ(n) and gcd(e, φ(n)) = 1: <span className="text-primary">e = 17</span></li>
          <li>Compute d as the modular inverse of e: <span className="text-primary">d = 2753</span></li>
          <li><strong>Public key: (n=3233, e=17)</strong> — share this freely</li>
          <li><strong>Private key: (n=3233, d=2753)</strong> — keep secret</li>
        </ol>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-muted-foreground">Encryption: <span className="text-primary">C = M^e mod n</span></div>
          <div className="text-muted-foreground">Decryption: <span className="text-primary">M = C^d mod n</span></div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic text-center uppercase tracking-widest font-bold">In production: Primes are 2048+ bits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-accent flex items-center gap-2">
            <Flag size={20} /> Certificate Authorities
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Public keys solve secrecy, but not **Identity**. How do you know Alice's public key actually belongs to Alice?
          </p>
          <div className="bg-muted/10 border border-border p-4 rounded-xl space-y-3">
            <div className="flex gap-3 text-[10px]">
              <div className="bg-accent/20 text-accent font-bold px-2 py-1 rounded">ROOT</div>
              <p className="text-muted-foreground underline decoration-accent/40">Trusted explicitly by your OS/Browser.</p>
            </div>
            <div className="flex gap-3 text-[10px]">
              <div className="bg-blue-500/20 text-blue-400 font-bold px-2 py-1 rounded">INTM</div>
              <p className="text-muted-foreground underline decoration-blue-500/40">Signed by Root to sign end-entities.</p>
            </div>
            <div className="flex gap-3 text-[10px]">
              <div className="bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded">LEAF</div>
              <p className="text-muted-foreground">The actual certificate for a website.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-accent flex items-center gap-2">
            <Shield size={20} /> Digital Signature Math
          </h3>
          <div className="relative p-5 bg-black border border-accent/30 rounded-xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Shield className="text-accent animate-pulse" size={40} />
            </div>
            <div className="font-mono text-[10px] space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>1. Hash Content:</span>
                <span className="text-accent">H = hash(M)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>2. Pad and Mask:</span>
                <span className="text-accent">P = PSS_Pad(H)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>3. Sign with Private:</span>
                <span className="text-accent">S = P^d mod n</span>
              </div>
              <div className="flex justify-between">
                <span>4. Verify with Public:</span>
                <span className="text-accent">P' = S^e mod n</span>
              </div>
              <p className="text-center text-[9px] pt-4 opacity-50 uppercase tracking-[0.2em]">Our Tool uses RSA-PSS for Probabilistic Security</p>
            </div>
          </div>
        </div>
      </div>


      <h2>📐 ECC: Elliptic Curve Cryptography</h2>
      <p>
        ECC is the modern successor to RSA. Instead of prime factorization, it exploits the mathematical structure of <strong>elliptic curves over finite fields</strong>. The core operation is point multiplication on the curve — easy in one direction (given k and G, compute kG), practically impossible to reverse (the Elliptic Curve Discrete Logarithm Problem).
      </p>

      <div className="not-prose bg-accent/10 border-l-2 border-accent p-5 rounded-r-xl my-6">
        <h4 className="font-bold text-accent mb-2">🏆 Why ECC Beats RSA for New Systems</h4>
        <div className="overflow-x-auto">
          <table className="text-sm w-full mt-3 font-mono">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs">
                <th className="text-left py-2 pr-6">Security Level</th>
                <th className="text-left py-2 pr-6">RSA Key Size</th>
                <th className="text-left py-2">ECC Key Size</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-border/50"><td className="py-2 pr-6">80-bit</td><td className="py-2 pr-6 text-red-400">1024 bits</td><td className="py-2 text-primary">160 bits</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-6">112-bit</td><td className="py-2 pr-6 text-orange-400">2048 bits</td><td className="py-2 text-primary">224 bits</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-6">128-bit</td><td className="py-2 pr-6 text-yellow-400">3072 bits</td><td className="py-2 text-primary">256 bits</td></tr>
              <tr><td className="py-2 pr-6">256-bit</td><td className="py-2 pr-6 text-red-500">15360 bits</td><td className="py-2 text-primary">521 bits</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Smaller keys = less bandwidth, faster computation, less battery drain — critical for mobile and IoT devices. Bitcoin, TLS 1.3, and Signal all use ECC.</p>
      </div>

      <h2>🌐 Real-World Applications</h2>
      <p>
        Asymmetric encryption solves the "stranger problem." It is the foundation of trust on the internet, allowing us to verify identities and exchange secrets without ever meeting.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {[
          {
            title: "Digital Signatures",
            desc: "The 'electronic ink' of the internet. Proves a document came from you and hasn't been altered since you signed it.",
            icon: "✍️",
            color: "border-accent/30 bg-accent/5 shadow-[0_0_15px_-5px_rgba(245,158,11,0.2)]"
          },
          {
            title: "SSH (Secure Shell)",
            desc: "Used by developers to securely log into servers. Your private key stays on your laptop; the server only knows your public key.",
            icon: "💻",
            color: "border-blue-500/30 bg-blue-500/5 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)]"
          },
          {
            title: "Cryptocurrencies",
            desc: "Wallets are just key pairs. Signing a transaction with your private key proves you 'own' the coins without revealing the key.",
            icon: "🪙",
            color: "border-primary/30 bg-primary/5 shadow-[0_0_15px_-5px_rgba(16,185,129,0.2)]"
          }
        ].map((item) => (
          <div key={item.title} className={`group p-5 rounded-xl border ${item.color} transition-all duration-300 hover:-translate-y-1 hover:border-accent/50`}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>


      <h2>🔮 The Post-Quantum Threat</h2>
      <p>
        Quantum computers running <strong>Shor's Algorithm</strong> can solve both the integer factorization and elliptic curve discrete logarithm problems in polynomial time — theoretically breaking RSA and ECC. A sufficiently powerful quantum computer would render modern internet encryption obsolete.
      </p>
      <div className="not-prose bg-orange-500/10 border border-orange-500/30 p-5 rounded-xl my-4">
        <p className="text-sm text-foreground/80">
          <strong className="text-orange-400">NIST is ready:</strong> In 2024, NIST finalized the first post-quantum cryptography standards, including <strong>ML-KEM (Kyber)</strong> for key exchange and <strong>ML-DSA (Dilithium)</strong> for digital signatures. These algorithms are based on lattice problems that quantum computers cannot efficiently solve. Major tech companies are already beginning migration.
        </p>
      </div>

      <hr className="my-12 border-border" />

      <div className="not-prose flex justify-between">
        <Link href="/learn/file-conversion" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 pb-8">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: File Conversion
        </Link>
        <Link href="/learn/diffie-hellman" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors mb-8">
          Next: Diffie-Hellman <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
