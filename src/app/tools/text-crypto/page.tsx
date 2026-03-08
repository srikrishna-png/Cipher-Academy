"use client";

import { useState, useRef, useCallback } from "react";
import {
  encryptAES, decryptAES,
  encryptDES, decryptDES,
  encrypt3DES, decrypt3DES,
  encryptRC4, decryptRC4,
  encryptRabbit, decryptRabbit
} from "@/lib/crypto/symmetric";
import { hashMD5, hashSHA256, hashSHA512 } from "@/lib/crypto/hash";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Unlock, Hash, Copy, Check, Upload, FileText, X,
  ChevronDown, AlertCircle, Shield, File, Download, Key, Clock, Info
} from "lucide-react";

type Mode = "encrypt" | "decrypt" | "hash";
type Algorithm = "AES" | "DES" | "3DES" | "RC4" | "Rabbit";
type HashAlgo = "MD5" | "SHA-256" | "SHA-512";

export default function TextCryptoPage() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState<Algorithm>("AES");
  const [hashAlgo, setHashAlgo] = useState<HashAlgo>("SHA-256");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [isFileMode, setIsFileMode] = useState(false);
  const [isBinary, setIsBinary] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File handling ──────────────────────────────────────────────────
  const loadFile = (file: File) => {
    setError("");
    setFileName(file.name);
    setFileSize(file.size);
    setIsFileMode(true);

    // Check if it's likely a binary file or user wants binary mode
    const isText = file.type.startsWith('text/') ||
      ['.txt', '.json', '.md', '.csv', '.xml'].some(ext => file.name.endsWith(ext));

    setIsBinary(!isText);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string ?? "";
      if (!isText) {
        // For binary, we store the base64 part
        setInput(result.split(',')[1] || result);
      } else {
        setInput(result);
      }
    };
    reader.onerror = () => setError("Failed to read file.");

    if (isText) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }, []);

  const clearFile = () => {
    setInput("");
    setFileName("");
    setFileSize(0);
    setIsFileMode(false);
    setIsBinary(false);
    setOutput("");
    setError("");
  };

  // ── Core processing ─────────────────────────────────────────────────
  const process = () => {
    setError("");
    setOutput("");
    if (!input.trim()) { setError("Please enter text or drop a file."); return; }

    try {
      let result = "";
      if (mode === "hash") {
        result = hashAlgo === "MD5" ? hashMD5(input)
          : hashAlgo === "SHA-256" ? hashSHA256(input)
            : hashSHA512(input);
      } else {
        if (!key.trim()) { setError("A secret key is required for encryption/decryption."); return; }

        const algos = {
          AES: { enc: encryptAES, dec: decryptAES },
          DES: { enc: encryptDES, dec: decryptDES },
          "3DES": { enc: encrypt3DES, dec: decrypt3DES },
          RC4: { enc: encryptRC4, dec: decryptRC4 },
          Rabbit: { enc: encryptRabbit, dec: decryptRabbit }
        };

        const runner = algos[algo];
        result = mode === "encrypt" ? runner.enc(input, key) : runner.dec(input, key);
      }
      setOutput(result);
    } catch {
      setError("Processing failed. Check your key or input and try again.");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    let blob: Blob;
    let extension = fileName.split('.').pop() || "txt";

    // Attempt to detect if output is a DataURL
    if (output.startsWith("data:")) {
      try {
        const arr = output.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        blob = new Blob([u8arr], { type: mime });
        extension = fileName.split('.').pop() || mime?.split('/')[1] || "bin";
      } catch {
        blob = new Blob([output], { type: "text/plain" });
      }
    } else if (mode === "decrypt" && (isBinary || /^[A-Za-z0-9+/=]+$/.test(output.substring(0, 100)))) {
      // If we're decrypting something and it looks like Base64 (likely a binary file)
      try {
        const byteCharacters = atob(output);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray]);
        extension = fileName.split('.').pop() || "bin";
      } catch {
        blob = new Blob([output], { type: "text/plain" });
      }
    } else {
      blob = new Blob([output], { type: "text/plain" });
      if (mode === "encrypt") extension = "encrypted";
      else if (mode === "hash") extension = "hash";
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mode === "encrypt" ? "encrypted" : mode === "decrypt" ? "decrypted" : "hash"}_output.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const MODES: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: "encrypt", label: "Encrypt", icon: <Lock size={15} /> },
    { id: "decrypt", label: "Decrypt", icon: <Unlock size={15} /> },
    { id: "hash", label: "Hash", icon: <Hash size={15} /> },
  ];

  const getSecurityLevel = (a: Algorithm) => {
    if (a === "AES") return { label: "Military Grade", color: "text-green-400" };
    if (a === "3DES" || a === "Rabbit") return { label: "Moderate", color: "text-yellow-400" };
    return { label: "Insecure/Legacy", color: "text-red-400" };
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono text-primary flex items-center gap-2">
          <Shield size={24} /> Symmetric Studio
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Professional-grade symmetric cryptography. Support for various algorithms and binary file streams.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex bg-muted/30 rounded-xl p-1 border border-border w-fit gap-1">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setOutput(""); setError(""); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
              ${mode === m.id ? "bg-primary text-black shadow font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Left: Input ── */}
        <div className="flex flex-col gap-3">

          {/* Algorithm selector */}
          {mode !== "hash" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Algorithm:</label>
                <div className="flex flex-wrap gap-1 bg-background border border-border rounded-lg p-0.5">
                  {(["AES", "3DES", "Rabbit", "DES", "RC4"] as Algorithm[]).map(a => (
                    <button key={a} onClick={() => setAlgo(a)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all
                        ${algo === a ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-muted/20 border border-border rounded-lg w-fit">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Security:</span>
                <span className={`text-[10px] font-bold ${getSecurityLevel(algo).color}`}>
                  {getSecurityLevel(algo).label}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hash:</label>
              <div className="flex gap-1 bg-background border border-border rounded-lg p-0.5">
                {(["MD5", "SHA-256", "SHA-512"] as HashAlgo[]).map(h => (
                  <button key={h} onClick={() => setHashAlgo(h)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all
                      ${hashAlgo === h ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* File drop zone / text area */}
          <div className="relative flex flex-col gap-0">
            {/* File info */}
            <AnimatePresence>
              {isFileMode && fileName && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-primary/10 border border-primary/30 text-primary text-xs font-mono px-3 py-2 rounded-t-lg"
                >
                  <File size={14} />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="truncate font-bold">{fileName}</span>
                    <span className="text-[10px] opacity-70">
                      {(fileSize / 1024).toFixed(1)} KB • {isBinary ? "Binary (Base64)" : "Text Mode"}
                    </span>
                  </div>
                  <button onClick={clearFile} className="p-1 hover:bg-primary/20 rounded transition-colors"><X size={14} /></button>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={`relative border rounded-xl overflow-hidden transition-all
                ${isFileMode && fileName ? "rounded-tl-none rounded-tr-none border-t-0" : ""}
                ${isDragging ? "border-primary bg-primary/5 scale-[1.005]" : "border-border"}`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
            >
              <textarea
                rows={8}
                spellCheck={false}
                placeholder={mode === "encrypt"
                  ? "Paste secret text or drop any file (images, docs, etc.)…"
                  : mode === "decrypt"
                    ? "Paste ciphertext or drop an encrypted file…"
                    : "Enter content to hash or drop any file…"}
                value={input}
                onChange={e => { setInput(e.target.value); if (!e.target.value) clearFile(); }}
                className="w-full bg-background p-4 font-mono text-[11px] leading-relaxed resize-none focus:outline-none scrollbar-thin"
              />

              {/* Drag overlay */}
              <AnimatePresence>
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/20 backdrop-blur-sm border-2 border-primary border-dashed rounded-xl flex flex-col items-center justify-center gap-3 pointer-events-none"
                  >
                    <Upload size={48} className="text-primary animate-bounce" />
                    <span className="text-primary font-bold text-lg uppercase tracking-widest">Release to load</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors font-bold uppercase border border-border hover:border-primary/50 px-3 py-1.5 rounded-lg"
                >
                  <Upload size={12} /> Load File
                </button>
                {input && (
                  <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter opacity-60">
                    {input.length.toLocaleString()} bytes in stream
                  </span>
                )}
              </div>
              <input ref={fileInputRef} type="file" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
            </div>
          </div>

          {/* Key input */}
          {mode !== "hash" && (
            <div className="flex flex-col gap-1.5 bg-muted/10 p-4 rounded-xl border border-border">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Key size={12} /> Symmetric Secret Key
              </label>
              <input
                type="password"
                placeholder="Enter key (keep it secret!)…"
                value={key}
                onChange={e => setKey(e.target.value)}
                className="bg-background border border-border rounded-lg px-4 py-2.5 font-mono text-sm focus:outline-none focus:border-primary transition-all"
              />
            </div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
              <AlertCircle size={15} /> {error}
            </motion.div>
          )}

          <CyberButton onClick={process} className="h-12 w-full text-base font-bold uppercase tracking-widest">
            {mode === "encrypt" ? <><Lock size={18} className="mr-2" /> Secure Stream</>
              : mode === "decrypt" ? <><Unlock size={18} className="mr-2" /> Open Stream</>
                : <><Hash size={18} className="mr-2" /> Genesis Hash</>}
          </CyberButton>
        </div>

        {/* ── Right: Output ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Stream Result</label>
            {output && (
              <div className="flex gap-2">
                <button onClick={copyOutput}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors font-bold uppercase border border-border hover:border-primary/50 px-3 py-1.5 rounded-lg">
                  {copied ? <><Check size={12} className="text-primary" /> Done!</> : <><Copy size={12} /> Copy</>}
                </button>
                <button onClick={downloadOutput}
                  className="flex items-center gap-1.5 text-[10px] text-primary hover:text-primary/70 transition-colors font-bold uppercase border border-primary/30 px-3 py-1.5 rounded-lg bg-primary/5">
                  <Download size={12} /> Get File
                </button>
              </div>
            )}
          </div>

          <div className={`flex-1 min-h-[300px] border rounded-xl p-4 font-mono text-[10px] break-all overflow-y-auto transition-all duration-500 scrollbar-thin
            ${output
              ? mode === "encrypt" ? "bg-black/60 border-primary/40 text-primary shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                : mode === "decrypt" ? "bg-black/60 border-accent/40 text-accent shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                  : "bg-black/60 border-blue-500/40 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
              : "bg-muted/5 border-border text-muted-foreground italic flex items-center justify-center"
            }`}>
            {output ? (
              <div className="animate-in fade-in duration-1000">
                {output.length > 5000 ? output.substring(0, 5000) + "... (truncated)" : output}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-30">
                <Shield size={48} />
                <span>PENDING STREAM</span>
              </div>
            )}
          </div>

          {output && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/10 border border-border p-3 rounded-xl">
                <div className="text-[8px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Hash size={10} /> Stream Integrity
                </div>
                <div className="text-[10px] font-mono text-primary truncate">
                  {hashSHA256(output).substring(0, 32)}...
                </div>
              </div>
              <div className="bg-muted/10 border border-border p-3 rounded-xl">
                <div className="text-[8px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Clock size={10} /> Block Time
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Info Card */}
      <div className="bg-muted/10 border border-border p-6 rounded-2xl flex gap-4">
        <Info className="text-primary shrink-0" size={24} />
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider">Technical Summary</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This module processes data streams using {algo} symmetric encryption. When using **Binary Mode**, files are ingested as Base64 clusters before cryptographic transforms.
            <span className="text-primary/70 ml-1">Tip: Use AES for production data and legacy algorithms (DES/RC4) only for educational research.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
