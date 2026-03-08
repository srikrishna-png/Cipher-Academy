"use client";

import { useState, useRef, useCallback } from "react";
import { signJWT, decodeJWT, verifyJWT } from "@/lib/crypto/jwt";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldAlert,
    FileJson,
    Search,
    Clock,
    Info,
    ChevronRight,
    PenTool,
    ShieldCheck,
    Key,
    Copy,
    Check,
    Upload,
    FileText,
    X,
    AlertCircle,
    Shield
} from "lucide-react";

type Mode = "generate" | "inspect";

export default function JWTStudioPage() {
    const [activeMode, setActiveMode] = useState<Mode>("inspect");

    // ── Common State ──────────────────────────────────────────────────
    const [secret, setSecret] = useState("your-256-bit-secret");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    // ── Generation State ──────────────────────────────────────────────
    const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true,\n  "iat": ' + Math.floor(Date.now() / 1000) + '\n}');
    const [generatedJWT, setGeneratedJWT] = useState("");
    const [isFileMode, setIsFileMode] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Inspection State ──────────────────────────────────────────────
    const [tokenToInspect, setTokenToInspect] = useState("");
    const [decoded, setDecoded] = useState<{ header: any; payload: any; signature: string } | null>(null);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    // ── Handlers ──────────────────────────────────────────────────────

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const loadFile = (file: File) => {
        setError("");
        setFileName(file.name);
        setIsFileMode(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string ?? "";
            setPayloadInput(content);
        };
        reader.onerror = () => setError("Failed to read file.");
        reader.readAsText(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) loadFile(file);
    }, []);

    const handleGenerate = async () => {
        setError("");
        if (!secret.trim()) {
            setError("Please provide a secret key before signing.");
            return;
        }
        try {
            let payload;
            try {
                payload = JSON.parse(payloadInput);
            } catch {
                payload = payloadInput;
            }

            const jwt = await signJWT(payload, secret);
            setGeneratedJWT(jwt);
        } catch (e: any) {
            setError(e.message || "Signing failed");
        }
    };

    const handleInspect = async () => {
        setError("");
        setIsVerified(null);

        if (!tokenToInspect.trim()) {
            setError("Please paste a token to inspect.");
            return;
        }

        const result = decodeJWT(tokenToInspect);

        if (!result) {
            setError("Invalid JWT format.");
            setDecoded(null);
            return;
        }

        setDecoded(result);
        if (secret.trim()) {
            const verified = await verifyJWT(tokenToInspect, secret);
            setIsVerified(verified);
        } else {
            setError("Token decoded, but provide a secret key to verify the signature.");
        }
    };

    const clearFile = () => {
        setPayloadInput("");
        setFileName("");
        setIsFileMode(false);
        setError("");
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center gap-3">
                    <FileJson size={32} /> JWT Studio
                </h1>
                <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
                    Generate, sign, and inspect JSON Web Tokens (JWT). Use this studio to understand the standard and test your own token flows.
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-muted/20 border border-border p-1 rounded-xl w-fit">
                <button
                    onClick={() => { setActiveMode("inspect"); setError(""); }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMode === "inspect" ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                >
                    <Search size={16} /> Inspect & Verify
                </button>
                <button
                    onClick={() => { setActiveMode("generate"); setError(""); }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMode === "generate" ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                >
                    <PenTool size={16} /> Generate (Sign)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ── Left Side: Input ── */}
                <div className="space-y-6">

                    {/* Secret Key (Common) */}
                    <div className="bg-muted/10 border border-border p-5 rounded-2xl space-y-3">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                            <Key size={12} /> Secret Key (HMAC Shared Secret)
                        </label>
                        <input
                            type="password"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            placeholder="Enter secret for signing/verification..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-primary transition-all"
                        />
                    </div>

                    {activeMode === "generate" ? (
                        /* GENERATE MODE INPUT */
                        <div className="space-y-4">
                            <div className="bg-muted/10 border border-border p-5 rounded-2xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                                        <FileText size={12} /> Payload (JSON or Text)
                                    </label>
                                    <button onClick={() => fileInputRef.current?.click()} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                                        <Upload size={10} /> Upload File
                                    </button>
                                </div>

                                <div className="relative">
                                    <AnimatePresence>
                                        {isFileMode && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                className="bg-primary/10 border border-primary/30 flex items-center justify-between px-3 py-1.5 rounded-t-lg text-[10px] font-mono border-b-0"
                                            >
                                                <span className="truncate max-w-[200px]">{fileName}</span>
                                                <button onClick={clearFile}><X size={10} /></button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        className={`relative border rounded-xl overflow-hidden transition-all ${isFileMode ? "rounded-t-none" : ""} ${isDragging ? "border-primary bg-primary/5" : "border-border"}`}
                                    >
                                        <textarea
                                            value={payloadInput}
                                            onChange={(e) => setPayloadInput(e.target.value)}
                                            rows={8}
                                            className="w-full bg-background p-4 text-xs font-mono focus:outline-none resize-none"
                                        />
                                    </div>
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
                                </div>

                                <CyberButton onClick={handleGenerate} className="w-full">
                                    Sign & Generate JWT
                                </CyberButton>
                            </div>

                            {generatedJWT && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-primary uppercase">Generated JWT</span>
                                        <button onClick={() => handleCopy(generatedJWT)} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                                            {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                                        </button>
                                    </div>
                                    <div className="bg-black/40 border border-primary/30 p-4 rounded-xl text-[10px] font-mono break-all text-primary/80">
                                        {generatedJWT}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        /* INSPECT MODE INPUT */
                        <div className="bg-muted/10 border border-border p-5 rounded-2xl space-y-4">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                                <Search size={12} /> Paste JWT to Inspect
                            </label>
                            <textarea
                                value={tokenToInspect}
                                onChange={(e) => setTokenToInspect(e.target.value)}
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                rows={4}
                                className="w-full bg-background border border-border rounded-xl p-4 text-[10px] font-mono break-all focus:outline-none focus:border-primary transition-all resize-none"
                            />
                            <CyberButton onClick={handleInspect} className="w-full" disabled={!tokenToInspect}>
                                Decode & Verify
                            </CyberButton>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-xs text-red-400 flex items-center gap-2">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}
                </div>

                {/* ── Right Side: Results ── */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {!decoded ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-muted-foreground/40 border border-dashed border-border rounded-3xl p-12 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                                    <Shield size={32} />
                                </div>
                                <p className="text-sm font-mono uppercase tracking-tighter">Enter a token or generate one to see results</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Verification Status */}
                                <div className={`p-4 rounded-2xl border flex items-center justify-between ${isVerified === true ? "bg-green-500/10 border-green-500/30 text-green-400" : isVerified === false ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-muted/10 border-border text-muted-foreground"}`}>
                                    <div className="flex items-center gap-3">
                                        {isVerified === true ? <ShieldCheck size={24} /> : isVerified === false ? <ShieldAlert size={24} /> : <Shield size={24} />}
                                        <div>
                                            <div className="text-xs font-bold uppercase">Signature Status</div>
                                            <div className="text-[10px] font-mono">
                                                {isVerified === true ? "Verified (Secret Math Matches)" : isVerified === false ? "Invalid (Secret or Data Mismatch)" : "Decoded (Not Verified)"}
                                            </div>
                                        </div>
                                    </div>
                                    {isVerified === true && <div className="text-[10px] bg-green-500/20 px-2 py-0.5 rounded font-bold">SECURE</div>}
                                </div>

                                {/* Parts Breakdown */}
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl overflow-hidden">
                                        <div className="bg-red-500/10 px-3 py-1.5 text-[10px] font-mono text-red-400 uppercase flex justify-between">
                                            <span>Header</span>
                                            <span>Algorithm: {decoded.header.alg}</span>
                                        </div>
                                        <pre className="p-4 text-xs font-mono text-red-300 overflow-x-auto">{JSON.stringify(decoded.header, null, 2)}</pre>
                                    </div>

                                    {/* Payload */}
                                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl overflow-hidden">
                                        <div className="bg-purple-500/10 px-3 py-1.5 text-[10px] font-mono text-purple-400 uppercase">Payload</div>
                                        <pre className="p-4 text-xs font-mono text-purple-300 overflow-x-auto">
                                            {typeof decoded.payload === 'object' ? JSON.stringify(decoded.payload, null, 2) : decoded.payload}
                                        </pre>
                                    </div>

                                    {/* Signature */}
                                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl overflow-hidden">
                                        <div className="bg-blue-500/10 px-3 py-1.5 text-[10px] font-mono text-blue-400 uppercase">Signature Hash</div>
                                        <div className="p-4 text-[10px] font-mono text-blue-300 break-all leading-relaxed">{decoded.signature}</div>
                                    </div>
                                </div>

                                {/* Expiry Analysis */}
                                {decoded.payload?.exp && (
                                    <div className="bg-muted/10 border border-border p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary" />
                                            <span className="text-xs font-mono text-muted-foreground">Expires {new Date(decoded.payload.exp * 1000).toLocaleString()}</span>
                                        </div>
                                        {decoded.payload.exp < Date.now() / 1000 ? (
                                            <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded uppercase">Expired</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded uppercase">Active</span>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4">
                <h4 className="text-primary font-bold flex items-center gap-2 italic">
                    <Info size={16} /> JWT Studio Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground/70 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-foreground">Creating a Token:</p>
                        <p>1. Set your <strong>Secret Key</strong> (e.g., a long random string).</p>
                        <p>2. Edit the JSON payload or upload a text file.</p>
                        <p>3. Generate the JWT and copy it for use elsewhere.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-foreground">Verifying a Token:</p>
                        <p>1. Paste a JWT into the input.</p>
                        <p>2. Provide the <strong>Secret Key</strong> used to sign it.</p>
                        <p>3. Verify! If the secret matches, the status will turn <span className="text-green-400">Green</span>.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
