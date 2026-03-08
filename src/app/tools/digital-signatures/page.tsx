"use client";

import { useState, useEffect } from "react";
import { generateSignatureKeyPair, signMessage, verifySignature } from "@/lib/crypto/asymmetric";
import { CyberButton } from "@/components/ui/CyberButton";
import { motion, AnimatePresence } from "framer-motion";
import {
    PenTool,
    ShieldCheck,
    Key,
    RefreshCcw,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Hash,
    Copy,
    Check
} from "lucide-react";

export default function DigitalSignaturesPage() {
    const [keys, setKeys] = useState<{ publicKey: CryptoKey | null; privateKey: CryptoKey | null }>({ publicKey: null, privateKey: null });
    const [message, setMessage] = useState("The quick brown fox jumps over the lazy dog");
    const [signature, setSignature] = useState("");
    const [verifyMsg, setVerifyMsg] = useState("");
    const [verifySig, setVerifySig] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        handleGenerateKeys();
    }, []);

    const handleGenerateKeys = async () => {
        setIsGenerating(true);
        const newKeys = await generateSignatureKeyPair();
        setKeys(newKeys);
        setIsGenerating(false);
        setSignature("");
        setIsValid(null);
    };

    const handleSign = async () => {
        if (!keys.privateKey) return;
        const sig = await signMessage(message, keys.privateKey);
        setSignature(sig);
        setVerifyMsg(message);
        setVerifySig(sig);
        setIsValid(null);
    };

    const handleVerify = async () => {
        if (!keys.publicKey) return;
        const result = await verifySignature(verifyMsg, verifySig, keys.publicKey);
        setIsValid(result);
    };

    const copySignature = () => {
        navigator.clipboard.writeText(signature);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center gap-3">
                    <PenTool size={32} /> Digital Signatures
                </h1>
                <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
                    Digital signatures use asymmetric cryptography to provide <strong>authentication</strong> (proof of origin) and <strong>integrity</strong> (proof it wasn't tampered with).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ── Left: Signing ── */}
                <div className="space-y-6">
                    <div className="bg-muted/20 border border-border p-6 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Key size={14} /> 1. Generate Key Pair
                            </h3>
                            <button
                                onClick={handleGenerateKeys}
                                disabled={isGenerating}
                                className="text-xs text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
                            >
                                <RefreshCcw size={12} className={isGenerating ? "animate-spin" : ""} /> Regenerate
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-background/50 border border-border p-3 rounded-xl text-[10px] font-mono">
                                <div className="text-primary mb-1 font-bold">PUBLIC KEY</div>
                                <div className="truncate text-muted-foreground italic">{keys.publicKey ? "RSA 2048-bit (PSS)" : "Generating..."}</div>
                            </div>
                            <div className="bg-background/50 border border-border p-3 rounded-xl text-[10px] font-mono">
                                <div className="text-red-400 mb-1 font-bold">PRIVATE KEY</div>
                                <div className="truncate text-muted-foreground italic">{keys.privateKey ? "RSA 2048-bit (PSS)" : "Generating..."}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/20 border border-border p-6 rounded-2xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <PenTool size={14} /> 2. Sign Message
                        </h3>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter message to sign..."
                            className="w-full h-24 bg-background border border-border rounded-xl p-4 text-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none"
                        />

                        <CyberButton onClick={handleSign} className="w-full" disabled={!keys.privateKey}>
                            Create Signature
                        </CyberButton>
                    </div>

                    <AnimatePresence>
                        {signature && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-primary uppercase flex items-center gap-2">
                                        <Hash size={14} /> Resulting Signature (Base64)
                                    </h4>
                                    <button
                                        onClick={copySignature}
                                        className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:text-primary/70 transition-colors uppercase"
                                    >
                                        {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                                    </button>
                                </div>
                                <div className="bg-black/40 p-3 rounded-lg text-[10px] font-mono break-all text-primary/80 max-h-24 overflow-y-auto border border-primary/10">
                                    {signature}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Right: Verification ── */}
                <div className="space-y-6">
                    <div className="bg-muted/20 border border-border p-6 rounded-2xl space-y-6 flex flex-col h-full">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <ShieldCheck size={14} /> 3. Verify Signature
                        </h3>

                        <div className="space-y-4 flex-1">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Received Message</label>
                                <textarea
                                    value={verifyMsg}
                                    onChange={(e) => { setVerifyMsg(e.target.value); setIsValid(null); }}
                                    className="w-full h-20 bg-background border border-border rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Signature to Verify</label>
                                <textarea
                                    value={verifySig}
                                    onChange={(e) => { setVerifySig(e.target.value); setIsValid(null); }}
                                    className="w-full h-24 bg-background border border-border rounded-xl p-3 text-[10px] font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <CyberButton onClick={handleVerify} variant="secondary" className="w-full mt-2" disabled={!verifySig}>
                                Verify Integrity
                            </CyberButton>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <AnimatePresence mode="wait">
                                {isValid === null ? (
                                    <motion.div
                                        key="none"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="flex items-center justify-center gap-2 py-4 text-muted-foreground text-sm italic"
                                    >
                                        <AlertCircle size={16} /> Enter a message and signature to verify
                                    </motion.div>
                                ) : isValid ? (
                                    <motion.div
                                        key="valid"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center gap-2 py-4 px-6 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
                                    >
                                        <CheckCircle2 size={32} className="animate-bounce" />
                                        <span className="font-bold">SIGNATURE VALID</span>
                                        <p className="text-[10px] text-center opacity-80 uppercase tracking-tighter">Content is authentic and untampered.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="invalid"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center gap-2 py-4 px-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                                    >
                                        <XCircle size={32} />
                                        <span className="font-bold">VERIFICATION FAILED</span>
                                        <p className="text-[10px] text-center opacity-80 uppercase tracking-tighter">Signature does not match the content or key.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                    <AlertCircle size={18} /> How to test it?
                </h4>
                <ol className="text-sm text-foreground/80 space-y-2 list-decimal pl-5">
                    <li>Type a message and click <strong>"Create Signature"</strong>.</li>
                    <li>Click <strong>"Verify Integrity"</strong> — it should say VALID.</li>
                    <li>Now, change just <strong>one letter</strong> in the "Received Message" box and verify again.</li>
                    <li>The verification will fail, proving that the content has been tampered with!</li>
                </ol>
            </div>
        </div>
    );
}
