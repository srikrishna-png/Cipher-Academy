"use client";

import { useState, useRef, useCallback } from "react";
import { CyberButton } from "@/components/ui/CyberButton";
import { encodeStego, decodeStego } from "@/lib/crypto/stego";
import {
  Image as ImageIcon, Download, Upload, AlertCircle, Eye,
  EyeOff, Layers, ArrowDown, Lock, Unlock, FileImage, Info,
  Type, File, FileText, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CheckIcon() {
  return <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}

export default function SteganographyPage() {
  const [mode, setMode] = useState<"hide" | "reveal">("hide");
  const [secretType, setSecretType] = useState<"text" | "file">("text");

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageSize, setImageSize] = useState<{ w: number; h: number } | null>(null);

  const [secretText, setSecretText] = useState("");
  const [secretFile, setSecretFile] = useState<File | null>(null);

  const [revealedData, setRevealedData] = useState<{ payload: Uint8Array; metadata: any } | null>(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // Capacity: Total pixels * 3 (RGB) / 8 bits = max bytes. Subtract 500 bytes for header cushion.
  const maxBytes = imageSize ? Math.floor(((imageSize.w * imageSize.h * 3) / 8) - 500) : 0;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const secretFileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadImage = (file: File) => {
    setStatus({ type: "", message: "" });
    setRevealedData(null);
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => setImageSize({ w: img.width, h: img.height });
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const handleSecretFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSecretFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) loadImage(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const processSteganography = async () => {
    if (!imageSrc) { setStatus({ type: "error", message: "Please upload a carrier image first." }); return; }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) { setStatus({ type: "error", message: "Canvas not supported." }); return; }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    const img = new Image();
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        if (mode === "hide") {
          let payload: Uint8Array;
          let metadata: any;

          if (secretType === "text") {
            if (!secretText) throw new Error("Please enter text to hide.");
            payload = new TextEncoder().encode(secretText);
            metadata = { type: 'text', size: payload.length };
          } else {
            if (!secretFile) throw new Error("Please select a file to hide.");
            const buffer = await secretFile.arrayBuffer();
            payload = new Uint8Array(buffer);
            metadata = {
              type: 'file',
              filename: secretFile.name,
              mimeType: secretFile.type,
              size: payload.length
            };
          }

          const newImageData = encodeStego(imageData, payload, metadata);
          ctx.putImageData(newImageData, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = `stego_${Date.now()}.png`;
          a.click();

          setStatus({
            type: "success",
            message: `✓ Encoded successfully! ${secretType === 'text' ? 'Message' : 'File'} is now hidden in the pixels. Downloaded as PNG.`
          });
          setSecretText("");
          setSecretFile(null);
        } else {
          const result = decodeStego(imageData);
          if (result) {
            setRevealedData(result);
            setStatus({ type: "success", message: `✓ Found hidden ${result.metadata.type}! Header decoded successfully.` });
          } else {
            throw new Error("No hidden data found or format not recognized.");
          }
        }
      } catch (err: any) {
        setStatus({ type: "error", message: err.message || "Processing error." });
      } finally {
        setIsLoading(false);
      }
    };
    img.src = imageSrc;
  };

  const downloadRevealedFile = () => {
    if (!revealedData || revealedData.metadata.type !== 'file') return;
    const blob = new Blob([new Uint8Array(revealedData.payload)], { type: revealedData.metadata.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = revealedData.metadata.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-mono text-primary flex items-center gap-3">
          <Layers size={32} /> Steganography Studio 2.0
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Hide secret text or **entire files** (PDF, JPG, ZIP) inside image pixels using LSB manipulation.
          The carrier must be saved as a lossless PNG to preserve the hidden bits.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Mode Toggle */}
        <div className="flex bg-muted/30 rounded-xl p-1 border border-border w-fit">
          <button
            onClick={() => { setMode("hide"); setStatus({ type: "", message: "" }); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "hide" ? "bg-primary text-black shadow font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Lock size={14} /> Hide
          </button>
          <button
            onClick={() => { setMode("reveal"); setStatus({ type: "", message: "" }); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === "reveal" ? "bg-primary text-black shadow font-bold" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Unlock size={14} /> Reveal
          </button>
        </div>

        {mode === "hide" && (
          <div className="flex bg-muted/30 rounded-xl p-1 border border-border w-fit">
            <button
              onClick={() => setSecretType("text")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${secretType === "text" ? "bg-accent/20 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Type size={12} /> Text
            </button>
            <button
              onClick={() => setSecretType("file")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${secretType === "file" ? "bg-accent/20 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground"}`}
            >
              <FileText size={12} /> File
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Carrier Image */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Step 1: Carrier Image (PNG Recommended)</label>
          <div
            className={`relative w-full h-80 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col items-center justify-center
              ${isDragging ? "border-primary bg-primary/10" : "border-dashed border-muted-foreground/30 bg-background/50 hover:bg-muted/10 font-mono text-xs"}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            {imageSrc ? (
              <img src={imageSrc} alt="Carrier" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon size={40} className="opacity-20" />
                <span>DROP CARRIER IMAGE</span>
              </div>
            )}
          </div>
          {imageSize && (
            <div className="text-[10px] uppercase font-mono text-muted-foreground flex justify-between">
              <span>{imageSize.w}x{imageSize.h}px</span>
              <span className="text-primary">Max Payload: {(maxBytes / 1024).toFixed(1)} KB</span>
            </div>
          )}
        </div>

        {/* RIGHT: Secret Content */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            {mode === "hide" ? `Step 2: Hide ${secretType === 'text' ? 'Message' : 'File'}` : "Step 2: Results"}
          </label>

          <div className="flex-1 min-h-[320px] bg-muted/10 border border-border rounded-2xl p-6 flex flex-col">
            <AnimatePresence mode="wait">
              {mode === "hide" ? (
                secretType === "text" ? (
                  <motion.textarea
                    key="text"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full flex-1 bg-transparent font-mono text-sm resize-none focus:outline-none"
                    placeholder="Enter secret text..."
                    value={secretText}
                    onChange={(e) => setSecretText(e.target.value)}
                  />
                ) : (
                  <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl">
                    <input type="file" ref={secretFileInputRef} onChange={handleSecretFileChange} className="hidden" />
                    {secretFile ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                          <File size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold">{secretFile.name}</p>
                          <p className="text-[10px] text-muted-foreground">{(secretFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <CyberButton onClick={() => secretFileInputRef.current?.click()} variant="secondary" className="px-4 h-8 text-[10px]">Change File</CyberButton>
                      </div>
                    ) : (
                      <button onClick={() => secretFileInputRef.current?.click()} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                        <Upload size={32} className="opacity-20" />
                        <span className="text-xs font-mono">SELECT SECRET FILE</span>
                      </button>
                    )}
                  </motion.div>
                )
              ) : (
                <motion.div key="revealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
                  {revealedData ? (
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center text-primary">
                          {revealedData.metadata.type === 'text' ? <Type size={20} /> : <File size={20} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary">Content Found</p>
                          <p className="text-[10px] text-muted-foreground">
                            {revealedData.metadata.type === 'text' ? 'Text Message' : revealedData.metadata.filename} ({(revealedData.metadata.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      </div>

                      {revealedData.metadata.type === 'text' ? (
                        <div className="flex-1 bg-black/40 rounded-xl p-4 font-mono text-xs break-all overflow-y-auto max-h-[160px]">
                          {new TextDecoder().decode(revealedData.payload)}
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-xl">
                          <CyberButton onClick={downloadRevealedFile} className="gap-2">
                            <Download size={18} /> Download Hidden File
                          </CyberButton>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                      <EyeOff size={40} className="opacity-10" />
                      <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">Awaiting Pixel Scan</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {status.message && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`text-xs p-3 rounded-xl border flex items-start gap-2 ${status.type === 'success' ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                {status.type === 'success' ? <CheckCircle2 size={14} className="mt-0.5" /> : <AlertCircle size={14} className="mt-0.5" />}
                <span>{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <CyberButton
            onClick={processSteganography}
            disabled={isLoading || !imageSrc || (mode === 'hide' && secretType === 'file' && !secretFile) || (mode === 'hide' && secretType === 'text' && !secretText)}
            className="h-14 tracking-widest font-bold text-sm"
          >
            {isLoading ? "PROCESSING PIXELS..." : mode === 'hide' ? "HIDE & DOWNLOAD" : "REVEAL CONTENT"}
          </CyberButton>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
