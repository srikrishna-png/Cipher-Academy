import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">01</span>
        <h4 className="text-foreground/60 font-mono tracking-widest uppercase m-0">Module 1 — History</h4>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">The Evolution of Secrecy</h1>

      <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
        Cryptography is not just a modern computer science concept — it has been a crucial element of human communication, warfare, and politics for thousands of years.
      </p>

      <h2>⚔️ Ancient World: Substitution Ciphers</h2>
      <p>
        The earliest known use of cryptography is found in non-standard hieroglyphs carved into monuments of the Old Kingdom of Egypt circa <strong>1900 BC</strong>. However the first <em>systematic</em> cipher was the <strong>Caesar Cipher</strong>, used by Julius Caesar to protect military orders.
      </p>

      <div className="not-prose bg-muted/30 p-6 rounded-xl border border-border my-6">
        <h4 className="font-bold text-accent mb-3 font-mono">⚙️ Caesar Shift (ROT-3)</h4>
        <p className="text-sm text-muted-foreground mb-4">Every letter is shifted 3 positions forward in the alphabet.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm font-mono border-collapse">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <td className="py-2 pr-4 text-left font-bold">Plaintext</td>
                {["A", "B", "C", "D", "E", "F", "G", "H"].map(c => <td key={c} className="px-3 py-2 text-primary">{c}</td>)}
                <td className="text-muted-foreground">...</td>
              </tr>
              <tr className="text-muted-foreground">
                <td className="py-2 pr-4 text-left font-bold">Ciphertext</td>
                {["D", "E", "F", "G", "H", "I", "J", "K"].map(c => <td key={c} className="px-3 py-2 text-red-400">{c}</td>)}
                <td className="text-muted-foreground">...</td>
              </tr>
            </thead>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">Message "HELP" → "KHOS". The intended recipient just shifts back by 3 to decode.</p>
        <div className="mt-4 p-3 bg-background rounded-md border border-border font-mono text-sm flex gap-8">
          <div><span className="text-muted-foreground">Plaintext: </span><span className="text-primary">ATTACK AT DAWN</span></div>
          <div><span className="text-muted-foreground">Ciphertext: </span><span className="text-red-400">DWWDFN DW GDZQ</span></div>
        </div>
      </div>

      <h3>Why Caesar Fails Today</h3>
      <p>
        The Caesar Cipher can be broken in seconds — there are only <strong>25 possible shifts</strong>. An attacker simply tries all 25 and reads the one that makes sense. This is called an <em>exhaustive key search</em> or <em>brute force attack</em>.
      </p>

      <h2>🔒 The Vigenère Cipher (1553)</h2>
      <p>
        The Vigenère cipher was an answer to Caesar's weakness. Rather than a single fixed shift, it uses a <strong>keyword</strong> where each letter of the keyword determines the shift for the corresponding letter in the plaintext.
      </p>

      <div className="not-prose bg-muted/30 p-6 rounded-xl border border-border my-6">
        <h4 className="font-bold text-accent mb-3 font-mono">⚙️ Vigenère Example</h4>
        <div className="font-mono text-sm space-y-3">
          <div className="flex gap-2 items-center"><span className="text-muted-foreground w-28">Plaintext:</span> <span className="text-primary tracking-widest">HELLO</span></div>
          <div className="flex gap-2 items-center"><span className="text-muted-foreground w-28">Key:</span> <span className="text-yellow-400 tracking-widest">KEYKE</span> <span className="text-muted-foreground text-xs ml-2">(repeated to match length)</span></div>
          <div className="flex gap-2 items-center"><span className="text-muted-foreground w-28">Shifts:</span> <span className="text-purple-400 tracking-widest">10 4 24 10 4</span></div>
          <div className="border-t border-border pt-3 flex gap-2 items-center"><span className="text-muted-foreground w-28">Ciphertext:</span> <span className="text-red-400 tracking-widest">RIIJSCM</span></div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">The polyalphabetic substitution means "L" is encoded differently each time it appears — resisting simple frequency analysis.</p>
      </div>

      <p>It was so strong it was called "<em>le chiffre indéchiffrable</em>" (the undecipherable cipher) for 300 years — until Charles Babbage broke it in 1854 using <em>index of coincidence</em>.</p>

      <h2>⚡ The Enigma Machine (1920s–1945)</h2>
      <p>
        The German military's Enigma machine was an electro-mechanical rotor cipher. Each keypress sent an electrical signal through a series of rotors, a plugboard, and a reflector, producing a completely different output letter. Critically, <strong>the rotors advanced with each keypress</strong> — so pressing "A" twice produced two different ciphertext letters.
      </p>

      <div className="not-prose bg-red-500/10 border border-red-500/30 p-6 rounded-xl my-6">
        <h4 className="font-bold text-red-400 mb-3 font-mono">🔐 Why Enigma Was Near-Unbreakable</h4>
        <ul className="space-y-2 text-sm text-foreground">
          <li>✦ <strong>158 quintillion</strong> (1.58 × 10²⁰) possible initial configurations</li>
          <li>✦ Rotors advanced with every keypress — no repeated substitution pattern</li>
          <li>✦ Settings changed daily — keys valid for only 24 hours</li>
          <li>✦ Reflector design meant encipherment and decipherment used the same machine</li>
        </ul>
      </div>

      <p>
        Breaking Enigma required the world's first programmable computers (<strong>Colossus</strong>) and the genius of mathematicians like <strong>Alan Turing</strong> at Bletchley Park, England. Turing's "<em>bombe</em>" machine exploited a fundamental flaw: Enigma could never encode a letter as itself ("A" would never produce "A"), dramatically narrowing the possibility space.
      </p>

      <h2>💻 The Digital Age: DES and AES</h2>
      <p>
        With computers came mathematical algorithms. In <strong>1977</strong>, the US Government standardized <strong>DES (Data Encryption Standard)</strong> with a 56-bit key. By 1999, the EFF cracked DES in just <strong>22 hours and 15 minutes</strong> using a dedicated machine, exposing 56 bits as dangerously small.
      </p>
      <p>
        In <strong>2001</strong>, NIST selected the <strong>Rijndael algorithm</strong> as the new <strong>AES (Advanced Encryption Standard)</strong>, supporting 128, 192, or 256-bit keys. AES-256 with current supercomputers would require more computation than the number of atoms in the observable universe to brute-force.
      </p>

      <h2>🌐 Public Key Revolution (1976)</h2>
      <p>
        In 1976, Whitfield Diffie and Martin Hellman published <em>"New Directions in Cryptography"</em>, introducing the radical idea of <strong>public-key cryptography</strong>: two mathematically linked keys, one public and one private, that together enable secure communication without ever sharing a secret in advance. This concept powers every secure website (HTTPS) today.
      </p>

      <div className="not-prose bg-primary/10 border border-primary/30 p-6 rounded-xl my-6">
        <h4 className="font-bold text-primary mb-4 font-mono">📅 Cryptography Timeline</h4>
        <div className="relative border-l-2 border-primary/30 pl-6 space-y-4">
          {[
            { year: "1900 BC", event: "Egyptian non-standard hieroglyphs — earliest known cryptography" },
            { year: "100 BC", event: "Caesar Cipher — systematic substitution cipher" },
            { year: "1553", event: "Vigenère Cipher — first polyalphabetic cipher" },
            { year: "1920s", event: "Enigma Machine — electro-mechanical rotor cipher" },
            { year: "1945", event: "Colossus — first programmable computer, breaks Enigma" },
            { year: "1977", event: "DES standardized by NIST" },
            { year: "1976", event: "Diffie-Hellman Key Exchange published" },
            { year: "1977", event: "RSA algorithm invented (Rivest, Shamir, Adleman)" },
            { year: "2001", event: "AES adopted — the global encryption standard" },
            { year: "2009", event: "Bitcoin launched — cryptography meets finance" },
            { year: "2024+", event: "Post-Quantum Cryptography standardisation begins (NIST)" },
          ].map((item) => (
            <div key={item.event} className="flex gap-4">
              <span className="text-primary font-mono text-xs font-bold w-16 shrink-0 mt-0.5">{item.year}</span>
              <p className="text-sm text-muted-foreground dark:text-foreground/80">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-12 border-border" />

      <div className="not-prose flex justify-end">
        <Link href="/learn/hashing" className="group flex items-center gap-3 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
          Next: Understanding Hashes <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
