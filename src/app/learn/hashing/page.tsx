import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Lock, Hash } from "lucide-react";
import { HashSlowingVisualizer } from "@/components/crypto/HashSlowingVisualizer";

export default function HashingPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">02</span>
        <h4 className="text-foreground/60 font-mono tracking-widest uppercase m-0">Module 2 — Hashing</h4>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">Cryptographic Hash Functions</h1>

      <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
        A hash function takes an input of <em>any size</em> and produces a fixed-size output called a <strong>digest</strong>. It is a one-way mathematical trapdoor — trivial to compute forwards, computationally infeasible to reverse.
      </p>

      <h2>🔑 The Five Properties of a Secure Hash</h2>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { title: "1. Deterministic", desc: "The same input always produces the same hash output — no randomness in the function itself.", color: "border-primary/40 bg-primary/5" },
          { title: "2. Pre-image Resistant", desc: "Given a hash H(x), it is computationally infeasible to find x. This is the one-way property.", color: "border-accent/40 bg-accent/5" },
          { title: "3. Second Pre-image Resistant", desc: "Given input x, it's infeasible to find a different input y such that H(x) = H(y).", color: "border-blue-500/40 bg-blue-500/5" },
          { title: "4. Collision Resistant", desc: "It's infeasible to find ANY two distinct inputs x and y where H(x) = H(y). Stronger than #3.", color: "border-purple-500/40 bg-purple-500/5" },
          { title: "5. Avalanche Effect", desc: "Flipping even one bit in the input causes approximately 50% of the output bits to change.", color: "border-orange-500/40 bg-orange-500/5" },
        ].map((p) => (
          <div key={p.title} className={`p-5 rounded-xl border ${p.color}`}>
            <h4 className="font-bold font-mono mb-2">{p.title}</h4>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>

      <h2>🌊 The Avalanche Effect (Live Demo)</h2>
      <p>
        One of the most striking properties of cryptographic hash functions. Below are two strings that differ by exactly <strong>one character</strong> — their SHA-256 digests look completely unrelated:
      </p>

      <div className="not-prose bg-muted border border-border rounded-xl p-6 my-6">
        <div className="space-y-5 font-mono text-sm">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">Input A</span>
              <code className="text-foreground dark:text-white">"cipher<span className="text-primary">a</span>cademy"</code>
            </div>
            <div className="break-all text-primary bg-background p-3 rounded border border-border">
              2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">Input B</span>
              <code className="text-foreground dark:text-white">"cipher<span className="text-red-400">b</span>cademy"</code>
              <span className="text-xs text-red-500">← changed 'a' to 'b'</span>
            </div>
            <div className="break-all text-red-400 bg-background p-3 rounded border border-red-500/20">
              486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic font-sans">
          Notice: every character in the digest changed — despite only 1 character difference in source. This is by design.
        </p>
      </div>

      <h2>⚡ SHA Family: How They Work</h2>
      <p>
        SHA (Secure Hash Algorithm) is a family developed by the NSA and standardized by NIST:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 hover:bg-red-500/20 transition-all">
          <h4 className="font-bold font-mono text-red-400 mb-2 flex items-center gap-2">
            <Hash size={16} /> MD5
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Message Digest 5. Fast, 128-bit digest. High susceptibility to collision attacks.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>📦 128-bit Digest</li>
            <li>🔄 64 Rounds</li>
            <li className="text-red-500 font-bold uppercase mt-2">Status: Broken</li>
          </ul>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 hover:bg-primary/20 transition-all">
          <h4 className="font-bold font-mono text-primary mb-2 flex items-center gap-2">
            <Hash size={16} /> SHA-256
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Part of the SHA-2 family. The backbone of Bitcoin and modern software integrity.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>📦 256-bit Digest</li>
            <li>🔄 64 Rounds</li>
            <li className="text-primary font-bold uppercase mt-2">Status: Secure</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 hover:bg-blue-500/20 transition-all">
          <h4 className="font-bold font-mono text-blue-400 mb-2 flex items-center gap-2">
            <Hash size={16} /> SHA-3
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3 leading-tight">Based on Keccak. Uses a unique "Sponge" construction for maximum logic variance.</p>
          <ul className="text-[10px] space-y-1 text-muted-foreground dark:text-foreground/80 font-mono">
            <li>📦 Variable Digest</li>
            <li>🔄 24 Rounds</li>
            <li className="text-blue-400 font-bold uppercase mt-2">Status: Recommended</li>
          </ul>
        </div>
      </div>

      <h2>💀 Real-World Hash Attacks</h2>

      <h3>Rainbow Table Attacks</h3>
      <p>
        Instead of brute-forcing hashes on demand, attackers precompute massive lookup tables — called <strong>rainbow tables</strong> — that map hash values back to common passwords. With MD5, <em>every password under 8 characters can be reversed in milliseconds</em> using publicly available rainbow tables.
      </p>
      <div className="not-prose bg-red-500/10 p-4 border border-red-500/20 rounded-xl my-4 text-sm">
        <strong className="text-red-400">Real breach:</strong> In 2012, LinkedIn was hacked. 117 million SHA-1 unsalted password hashes were dumped. 90%+ were cracked within days using rainbow tables.
      </div>

      <h3>Salted Hashes: The Defence</h3>
      <p>
        A <strong>salt</strong> is a random value appended to the password before hashing: <code>hash(password + random_salt)</code>. Even if two users pick the same password, their salted hashes differ. Salting defeats rainbow tables entirely, since the attacker would need a <em>separate</em> table for every possible salt value.
      </p>

      <div className="not-prose bg-muted border border-border p-5 rounded-xl font-mono text-sm my-6">
        <div className="space-y-3">
          <div><span className="text-muted-foreground">Password: </span><span className="text-foreground dark:text-white">"password123"</span></div>
          <div><span className="text-muted-foreground">Salt: </span><span className="text-yellow-400">"xB7kPq"</span> <span className="text-xs text-muted-foreground">(random per user)</span></div>
          <div className="border-t border-border pt-3">
            <span className="text-muted-foreground">SHA-256("password123" + "xB7kPq"): </span>
            <span className="text-primary break-all">a9b2f7e8c1d4...</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
            <Lock size={20} /> Salt vs Pepper
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-muted/20 border border-border rounded-xl">
              <h5 className="text-[10px] font-bold text-primary uppercase mb-1">Salt (Public-ish)</h5>
              <p className="text-[10px] text-muted-foreground leading-tight italic">Unique per user, stored in DB. Defeats Rainbow Tables.</p>
            </div>
            <div className="p-4 bg-muted/20 border border-border rounded-xl">
              <h5 className="text-[10px] font-bold text-accent uppercase mb-1">Pepper (Hard-Secret)</h5>
              <p className="text-[10px] text-muted-foreground leading-tight italic">Global secret, stored in environment. Forces absolute brute force even if the database is leaked.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
            <Shield size={20} /> Collision Probability
          </h3>
          <div className="p-5 bg-black/40 border border-border rounded-xl font-mono text-[9px] space-y-3">
            <div className="flex justify-between">
              <span className="opacity-50">Atoms in Earth:</span>
              <span>~10⁵⁰</span>
            </div>
            <div className="flex justify-between text-accent font-bold border-t border-white/5 pt-2">
              <span>SHA-256 Hashes:</span>
              <span>~1.1 × 10⁷⁷</span>
            </div>
            <p className="text-[8px] leading-tight text-muted-foreground pt-2">Searching for a SHA-256 collision is harder than finding one specific grain of sand among all the sand on billions of Earths.</p>
          </div>
        </div>
      </div>

      <h2>🐌 Why Slow Hashes Save Passwords</h2>
      <p>
        Even with salting, fast hash functions like SHA-256 allow attackers to try <strong>billions of guesses per second</strong> using GPUs. The industry solution: intentionally slow, memory-hard <strong>Key Derivation Functions (KDFs)</strong> designed for password storage.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { name: "bcrypt", year: "1999", mem: "Low", speed: "~100 hash/s (GPU)", status: "Good" },
          { name: "scrypt", year: "2009", mem: "High", speed: "~1000 hash/s", status: "Good" },
          { name: "Argon2id", year: "2015", mem: "Tunable", speed: "Tunable", status: "Best" },
        ].map((kdf) => (
          <div key={kdf.name} className="bg-muted/20 border border-primary/20 rounded-xl p-4 font-mono text-sm">
            <div className="text-primary font-bold text-lg mb-3">{kdf.name}</div>
            <div className="space-y-1 text-muted-foreground text-xs">
              <div>Year: <span className="text-foreground">{kdf.year}</span></div>
              <div>Memory: <span className="text-foreground">{kdf.mem}</span></div>
              <div>Speed: <span className="text-red-400">{kdf.speed}</span></div>
              <div className="mt-2">
                <span className={`px-2 py-0.5 rounded text-xs ${kdf.status === "Best" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{kdf.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p><strong>Argon2id</strong> (winner of the 2015 Password Hashing Competition) is the current gold standard. It is tunable — you can increase both the time and memory cost as hardware gets faster, maintaining security into the future.</p>

      {/* Interactive Visualizer */}
      <div className="my-16 not-prose">
        <HashSlowingVisualizer />
      </div>

      <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl my-16 not-prose relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <h3 className="text-2xl font-bold font-mono text-primary mb-6 flex items-center gap-3">
          <Hash className="text-primary" /> Logic: The Entropy Engine
        </h3>
        <p className="text-sm text-foreground/80 mb-8 max-w-2xl">
          The <strong>Entropy Tool</strong> uses information theory (Shannon's Entropy) to calculate the mathematical complexity of a string. Here's how the implementation works:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold text-xs italic">∑</div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-widest text-foreground dark:text-white mb-1">Shannon Equation</h5>
                <p className="text-[10px] text-muted-foreground leading-relaxed italic">H = - Σ P(x) log₂ P(x)</p>
                <p className="text-[9px] text-muted-foreground/60 mt-1">Calculates bits of uncertainty per character based on frequency distribution.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold text-xs">2^N</div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-widest text-foreground dark:text-white mb-1">Brute-Force Cost</h5>
                <p className="text-[10px] text-muted-foreground">2<sup>Total Bits</sup> = Combinations required to crack.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-white/5 rounded-2xl p-6 font-mono text-[10px] space-y-4">
            <div className="text-muted-foreground border-b border-white/5 pb-2 uppercase tracking-tighter font-bold">Tool Process Flow:</div>
            <div className="flex items-center gap-3">
              <span className="text-primary">1. Map Frequency:</span>
              <span className="text-muted-foreground">Count occurrences of each byte.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary">2. Calculate P(x):</span>
              <span className="text-muted-foreground">Frequency / Total Length.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary">3. Summation:</span>
              <span className="text-muted-foreground">Apply Log2 to derive actual bits.</span>
            </div>
          </div>
        </div>
      </div>


      <h2>🌐 Real-World Applications</h2>
      <p>
        Hashing is the "fingerprint" of the digital world. It is used wherever we need to verify that data is exactly what we expect it to be.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {[
          {
            title: "Password Storage",
            desc: "Servers never store your actual password. They store a salted hash, so even if the database is leaked, your password is safe.",
            icon: "🔑",
            color: "border-primary/30 bg-primary/5 shadow-[0_0_15px_-5px_rgba(16,185,129,0.2)]"
          },
          {
            title: "File Integrity",
            desc: "Software downloads often provide an MD5 or SHA-256 hash so you can verify the file wasn't corrupted or injected with malware.",
            icon: "📄",
            color: "border-blue-500/30 bg-blue-500/5 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)]"
          },
          {
            title: "Git / Version Control",
            desc: "Git identifies every commit and file state by its hash (SHA-1). If a single bit changes, the hash changes, alerting Git to the edit.",
            icon: "📜",
            color: "border-orange-500/30 bg-orange-500/5 shadow-[0_0_15px_-5px_rgba(249,115,22,0.2)]"
          }
        ].map((item) => (
          <div key={item.title} className={`group p-5 rounded-xl border ${item.color} transition-all duration-300 hover:-translate-y-1 hover:border-primary/50`}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <hr className="my-12 border-border" />

      <div className="not-prose flex justify-between">
        <Link href="/learn/history" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: History
        </Link>
        <Link href="/learn/hmac" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
          Next: HMAC Deep-Dive <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
