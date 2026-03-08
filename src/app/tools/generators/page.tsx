"use client";

import { useState } from "react";
import { CyberButton } from "@/components/ui/CyberButton";
import { generateSecurePassword } from "@/lib/crypto/generators";
import { KeyRound, Copy, Check, ShieldCheck, RefreshCw } from "lucide-react";

export default function GeneratorsPage() {
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        const newPass = generateSecurePassword(length, options);
        setPassword(newPass);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOptionChange = (key: keyof typeof options) => {
        setOptions(prev => {
            const next = { ...prev, [key]: !prev[key] };
            // Prevent user from unchecking all boxes
            if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) {
                return prev; 
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center justify-center gap-3">
                    <KeyRound size={32} /> Cryptographic Forge
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                    Generate mathematically secure passwords and encryption keys locally. Uses the native <code className="text-accent bg-accent/10 px-1 rounded">window.crypto</code> API for true entropy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                
                {/* Configuration Panel */}
                <div className="bg-muted/20 border border-border rounded-2xl p-6 flex flex-col gap-6">
                    <h3 className="text-xl font-bold font-mono flex items-center gap-2">
                        <ShieldCheck className="text-primary" /> Configuration
                    </h3>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Length</label>
                            <span className="font-mono text-primary font-bold">{length} chars</span>
                        </div>
                        <input 
                            type="range" 
                            min="8" max="128" 
                            value={length} 
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>8 (Weak)</span>
                            <span>128 (Maximum)</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Character Sets</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={options.uppercase} onChange={() => handleOptionChange("uppercase")} className="w-5 h-5 accent-primary bg-background border-border rounded" />
                                <span className="group-hover:text-primary transition-colors">A-Z (Uppercase)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={options.lowercase} onChange={() => handleOptionChange("lowercase")} className="w-5 h-5 accent-primary bg-background border-border rounded" />
                                <span className="group-hover:text-primary transition-colors">a-z (Lowercase)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={options.numbers} onChange={() => handleOptionChange("numbers")} className="w-5 h-5 accent-primary bg-background border-border rounded" />
                                <span className="group-hover:text-primary transition-colors">0-9 (Numbers)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={options.symbols} onChange={() => handleOptionChange("symbols")} className="w-5 h-5 accent-primary bg-background border-border rounded" />
                                <span className="group-hover:text-primary transition-colors">!@#$ (Symbols)</span>
                            </label>
                        </div>
                    </div>

                    <CyberButton onClick={handleGenerate} className="mt-auto h-12">
                        <RefreshCw className="mr-2" size={18} /> Forge Key
                    </CyberButton>
                </div>

                {/* Output Panel */}
                <div className="bg-background border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <span className="text-sm font-bold text-accent uppercase tracking-wider mb-8">Generated Result</span>
                    
                    <div className="w-full h-32 flex items-center justify-center">
                        {password ? (
                            <p className="font-mono text-2xl md:text-3xl text-primary break-all px-4 select-all">
                                {password}
                            </p>
                        ) : (
                            <span className="text-muted-foreground italic flex flex-col items-center gap-2">
                                <ShieldCheck size={32} className="opacity-20" />
                                Waiting for configuration
                            </span>
                        )}
                    </div>

                    {password && (
                        <button 
                            onClick={copyToClipboard}
                            className={`mt-8 px-6 py-2 rounded-full border transition-colors flex items-center gap-2 font-mono text-sm ${copied ? "bg-green-500/20 border-green-500/50 text-green-500" : "bg-muted border-border hover:bg-muted/80 text-foreground"}`}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
