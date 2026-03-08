"use client";

import { useState, useRef } from "react";
import { CyberButton } from "@/components/ui/CyberButton";
import { encryptAES, decryptAES } from "@/lib/crypto/symmetric";
import { Lock, Unlock, UploadCloud, File, AlertCircle } from "lucide-react";

export default function FileCryptoPage() {
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
    const [file, setFile] = useState<File | null>(null);
    const [secretKey, setSecretKey] = useState("");
    const [status, setStatus] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus("");
        }
    };

    const processFile = () => {
        if (!file) {
            setStatus("Please select a file first.");
            return;
        }
        if (!secretKey) {
            setStatus("A secret password is required.");
            return;
        }

        setIsProcessing(true);
        setStatus("Processing... Please wait.");

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const fileData = e.target?.result as string;
                let processedData = "";
                let newFileName = file.name;

                if (mode === "encrypt") {
                    // Encrypting the Base64 Data URL representation of the file
                    processedData = encryptAES(fileData, secretKey);
                    newFileName = `${file.name}.encrypted`;

                    const blob = new Blob([processedData], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = newFileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else {
                    // Decrypting the ciphertext back into a Data URL
                    processedData = decryptAES(fileData, secretKey);
                    if (processedData.startsWith("Decryption Failed")) {
                        setStatus(processedData);
                        setIsProcessing(false);
                        return;
                    }
                    newFileName = file.name.replace(".encrypted", "");

                    // Reconstruct original file from Data URL
                    try {
                        const arr = processedData.split(',');
                        if (arr.length < 2) throw new Error("Invalid DataURL");

                        const mime = arr[0].match(/:(.*?);/)?.[1];
                        const bstr = atob(arr[1]);
                        let n = bstr.length;
                        const u8arr = new Uint8Array(n);
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        const blob = new Blob([u8arr], { type: mime });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = newFileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    } catch (e) {
                        // Fallback: maybe it wasn't a DataURL but raw text?
                        const blob = new Blob([processedData], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = newFileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }
                }

                setStatus(`Success! File ${mode === "encrypt" ? "encrypted" : "decrypted"} and downloaded.`);
            } catch (err) {
                setStatus(`Error processing file. Make sure you are using the correct password.`);
            } finally {
                setIsProcessing(false);
            }
        };

        reader.onerror = () => {
            setStatus("Failed to read the file.");
            setIsProcessing(false);
        };

        if (mode === "encrypt") {
            // Read as Data URL so we preserve the file type and binary data safely in a string
            reader.readAsDataURL(file);
        } else {
            // If decrypting, we are reading the raw encrypted text string we generated earlier
            reader.readAsText(file);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto items-center text-center">
            <div>
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center justify-center gap-3">
                    <File size={32} /> File Vault
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                    Securely lock or unlock any file type directly in your browser.
                    Your files never leave your device.
                </p>
            </div>

            <div className="flex bg-muted rounded-md p-1 border border-border w-full max-w-xs">
                <button
                    onClick={() => setMode("encrypt")}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded ${mode === 'encrypt' ? 'bg-primary text-black' : 'hover:text-primary transition-colors'}`}
                >
                    Encrypt File
                </button>
                <button
                    onClick={() => setMode("decrypt")}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded ${mode === 'decrypt' ? 'bg-primary text-black' : 'hover:text-primary transition-colors'}`}
                >
                    Decrypt File
                </button>
            </div>

            <div className="w-full bg-muted/20 border border-border rounded-2xl p-8 flex flex-col gap-6">

                {/* Drag and Drop Zone Mockup */}
                <div
                    className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer bg-background"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept={mode === "decrypt" ? ".encrypted" : "*"}
                    />

                    {file ? (
                        <div className="flex flex-col items-center text-primary">
                            <File size={48} className="mb-4" />
                            <span className="font-bold truncate max-w-xs">{file.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                            <UploadCloud size={48} className="mb-4 opacity-50" />
                            <span className="font-bold">Click to select a file</span>
                            <span className="text-xs mt-1">
                                {mode === "encrypt" ? "Any file type supported" : "Must be a .encrypted file"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 text-left">
                    <label className="text-sm font-bold text-accent uppercase tracking-wider pl-1">Vault Password</label>
                    <input
                        type="password"
                        className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Enter encryption password..."
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                    />
                </div>

                {status && (
                    <div className={`p-3 rounded-md text-sm flex items-center justify-center gap-2 ${status.includes("Success") ? "bg-primary/20 text-primary border border-primary/30" : "bg-red-500/20 text-red-500 border border-red-500/30"}`}>
                        {status.includes("Success") ? <CheckIcon /> : <AlertCircle size={16} />}
                        {status}
                    </div>
                )}

                <CyberButton onClick={processFile} disabled={isProcessing} className="w-full h-14 text-lg mt-2">
                    {isProcessing ? "Processing..." : mode === "encrypt" ? <><Lock className="mr-2" /> Encrypt & Download</> : <><Unlock className="mr-2" /> Unlock & Download</>}
                </CyberButton>

            </div>
        </div>
    );
}

function CheckIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
}
