"use client";

import { useState, useRef, useCallback } from "react";
import { CyberButton } from "@/components/ui/CyberButton";
import { createZip, extractZip } from "@/lib/crypto/zip";
import {
    Archive, Upload, Download, X, File,
    FileArchive, Package, AlertCircle, CheckCircle2,
    FileSpreadsheet, FileText, LayoutTemplate, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZipCompressorPage() {
    const [mode, setMode] = useState<"compress" | "extract">("compress");
    const [files, setFiles] = useState<File[]>([]);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [extractedFiles, setExtractedFiles] = useState<{ name: string; blob: Blob }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const zipInputRef = useRef<HTMLInputElement>(null);

    const handleAddFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        setFiles(prev => [...prev, ...Array.from(newFiles)]);
        setStatus({ type: "", message: "" });
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleCompress = async () => {
        if (files.length === 0) return;
        setIsLoading(true);
        setStatus({ type: "", message: "" });
        try {
            const blob = await createZip(files);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `cipher_archive_${Date.now()}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Revoke after a delay to ensure browser has started the download
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            setStatus({ type: "success", message: `Successfully compressed ${files.length} files into ZIP archive.` });
        } catch (err: any) {
            setStatus({ type: "error", message: err.message || "Compression failed." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleExtract = async () => {
        if (!zipFile) return;
        setIsLoading(true);
        setStatus({ type: "", message: "" });
        try {
            const results = await extractZip(zipFile);
            setExtractedFiles(results);
            setStatus({ type: "success", message: `Successfully extracted ${results.length} files from ${zipFile.name}.` });
        } catch (err: any) {
            setStatus({ type: "error", message: err.message || "Extraction failed." });
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = (file: { name: string; blob: Blob }) => {
        const url = URL.createObjectURL(file.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadAll = () => {
        extractedFiles.forEach(f => downloadFile(f));
    };

    return (
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-mono text-primary flex items-center gap-3">
                    <Archive size={32} /> Zip Compressor
                </h1>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                    Professional file archiving and extraction. Securely bundle multiple files into a single ZIP archive
                    or unpack existing ones entirely within your browser. **No data ever leaves your device.**
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-muted/30 rounded-xl p-1 border border-border w-fit">
                <button
                    onClick={() => { setMode("compress"); setStatus({ type: "", message: "" }); }}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === "compress" ? "bg-primary text-black shadow font-bold" : "text-muted-foreground hover:text-foreground"}`}
                >
                    <Package size={16} /> Compress Files
                </button>
                <button
                    onClick={() => { setMode("extract"); setStatus({ type: "", message: "" }); }}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === "extract" ? "bg-primary text-black shadow font-bold" : "text-muted-foreground hover:text-foreground"}`}
                >
                    <Zap size={16} /> Extract Archive
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* LEFT: Upload Area */}
                <div className="flex flex-col gap-4 min-h-[400px]">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {mode === "compress" ? "Step 1: Select Files" : "Step 1: Select ZIP Archive"}
                    </label>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            if (mode === "compress") handleAddFiles(e.dataTransfer.files);
                            else if (e.dataTransfer.files[0].name.endsWith('.zip')) setZipFile(e.dataTransfer.files[0]);
                        }}
                        onClick={() => (mode === "compress" ? fileInputRef : zipInputRef).current?.click()}
                        className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer
                            ${isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-border bg-muted/5 hover:bg-muted/10"}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            className="hidden"
                            onChange={(e) => handleAddFiles(e.target.files)}
                        />
                        <input
                            type="file"
                            ref={zipInputRef}
                            accept=".zip"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && setZipFile(e.target.files[0])}
                        />

                        <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-4 text-muted-foreground">
                            {mode === "compress" ? <Upload size={32} /> : <FileArchive size={32} />}
                        </div>
                        <h3 className="text-lg font-bold mb-1">
                            {isDragging ? "Drop here" : mode === "compress" ? "Upload Files" : "Upload ZIP"}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                            Drag and drop or click to browse.<br />
                            {mode === "compress" ? "Support for any file type." : "Must be a valid .zip file."}
                        </p>
                    </div>
                </div>

                {/* RIGHT: List / Actions */}
                <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {mode === "compress" ? `Queue (${files.length})` : "Extracted Content"}
                    </label>

                    <div className="flex-1 bg-muted/10 border border-border rounded-2xl overflow-hidden flex flex-col min-h-[300px]">
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {mode === "compress" ? (
                                    files.length > 0 ? (
                                        files.map((file, i) => (
                                            <motion.div
                                                key={`${file.name}-${i}`}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex items-center gap-3 p-3 mb-2 bg-background/50 border border-border rounded-xl group"
                                            >
                                                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                                                    <File size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                                    className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-all"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-30">
                                            <Archive size={48} className="mb-2" />
                                            <p className="text-xs font-mono">NO FILES ADDED</p>
                                        </div>
                                    )
                                ) : (
                                    extractedFiles.length > 0 ? (
                                        extractedFiles.map((file, i) => (
                                            <motion.div
                                                key={`${file.name}-${i}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 p-3 mb-2 bg-background/50 border border-border rounded-xl"
                                            >
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">READY FOR DOWNLOAD</p>
                                                </div>
                                                <button
                                                    onClick={() => downloadFile(file)}
                                                    className="p-2 bg-muted hover:bg-primary hover:text-black rounded-md transition-all"
                                                >
                                                    <Download size={14} />
                                                </button>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-30">
                                            {zipFile ? (
                                                <>
                                                    <Archive size={48} className="mb-2 animate-pulse" />
                                                    <p className="text-xs font-mono uppercase tracking-[0.2em]">{zipFile.name}</p>
                                                    <p className="text-[10px] mt-1 italic">Click extract to see files</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Zap size={48} className="mb-2" />
                                                    <p className="text-xs font-mono">AWAITING ARCHIVE</p>
                                                </>
                                            )}
                                        </div>
                                    )
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Summary Bar */}
                        <div className="p-4 border-t border-border bg-muted/20">
                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-xs p-3 mb-4 rounded-lg flex items-start gap-2 ${status.type === 'success' ? 'bg-primary/5 text-primary border border-primary/20' : 'bg-red-500/5 text-red-500 border border-red-500/20'}`}
                                    >
                                        {status.type === 'success' ? <CheckCircle2 size={14} className="mt-0.5" /> : <AlertCircle size={14} className="mt-0.5" />}
                                        <span>{status.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {mode === "compress" ? (
                                <CyberButton
                                    onClick={handleCompress}
                                    disabled={files.length === 0 || isLoading}
                                    className="w-full h-12 text-sm tracking-widest font-bold"
                                >
                                    {isLoading ? "CREATING ZIP..." : "GENERATE ARCHIVE"}
                                </CyberButton>
                            ) : (
                                <div className="flex gap-2">
                                    <CyberButton
                                        onClick={handleExtract}
                                        disabled={!zipFile || isLoading}
                                        className="flex-1 h-12 text-sm tracking-widest font-bold"
                                        variant="primary"
                                    >
                                        {isLoading ? "EXTRACTING..." : "EXTRACT ALL"}
                                    </CyberButton>
                                    {extractedFiles.length > 0 && (
                                        <CyberButton
                                            onClick={downloadAll}
                                            className="h-12 w-12 p-0"
                                            variant="secondary"
                                        >
                                            <Download size={18} />
                                        </CyberButton>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Educational Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {[
                    {
                        title: "Why ZIP?",
                        icon: <FileArchive size={18} className="text-primary" />,
                        desc: "ZIP is the universal standard for data compression. It bundles multiple files into a single container while reducing file size using Deflate algorithms."
                    },
                    {
                        title: "How it Works",
                        icon: <LayoutTemplate size={18} className="text-accent" />,
                        desc: "This tool uses JSZip to process your data directly in the browser's memory. It creates a local stream, meaning your files are never uploaded to any server."
                    },
                    {
                        title: "Crypto Context",
                        icon: <Zap size={18} className="text-yellow-500" />,
                        desc: "Compression is often the first step before encryption. Reducing file size makes encryption faster and hides patterns in data density that could be exploited."
                    }
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-muted/10 border border-border rounded-2xl p-6 hover:bg-muted/20 transition-all"
                    >
                        <div className="flex items-center gap-2 mb-3 text-sm font-bold">{card.icon} {card.title}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
