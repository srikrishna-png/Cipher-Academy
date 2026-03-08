import Link from "next/link";
import { ArrowLeft, Image, EyeOff, Layers, Zap } from "lucide-react";

export default function SteganographyLearnPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 uppercase-headers">
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold font-mono text-sm border border-primary/30">12</span>
                <h4 className="text-slate-200 font-mono tracking-widest uppercase m-0">Module 12 — Steganography</h4>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">Steganography: Hidden in Plain Sight</h1>

            <p className="lead text-xl text-muted-foreground border-l-4 border-primary pl-4 py-2 not-prose">
                While encryption makes data <strong>unreadable</strong>, steganography makes it <strong>invisible</strong>. It is the art of hiding a secret message inside an ordinary, non-secret file.
            </p>

            <h2>👁️ LSB: Least Significant Bit Hiding</h2>
            <p>
                The most common digital steganography technique is <strong>LSB Hiding</strong>. It exploits the fact that human eyes and ears cannot detect extremely tiny variations in color or sound.
            </p>

            <div className="not-prose bg-muted/30 border border-border p-6 rounded-xl my-8">
                <h4 className="font-mono font-bold text-primary mb-4">🎨 How it Works (Pixels)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            A single pixel is made of Red, Green, and Blue (RGB) values, usually 0-255 (8 bits each).
                        </p>
                        <div className="p-4 bg-black/40 rounded-lg font-mono text-xs space-y-2 border border-white/5">
                            <div className="text-blue-400">Original Blue: 1011011<span className="text-white underline">0</span> (182)</div>
                            <div className="text-primary">Modified Blue: 1011011<span className="text-white underline">1</span> (183)</div>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">
                            The change from 182 to 183 is invisible to the eye, but that one bit can be extracted to rebuild a secret message.
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-800 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl">
                            <Image size={64} className="text-white/20 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] flex items-center justify-center">
                                <span className="text-[10px] font-mono tracking-widest text-primary animate-pulse">EXTRACTING DATA...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2>⚙️ Implementation: LSB Stego Tool</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
                <div className="bg-muted/10 border border-border p-5 rounded-xl space-y-4 shadow-lg shadow-black/20">
                    <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2">
                        <Layers size={18} /> The Protocol
                    </h3>
                    <div className="space-y-3">
                        <div className="flex gap-4">
                            <span className="text-xs font-bold text-primary opacity-50">01</span>
                            <div>
                                <p className="text-xs font-bold text-white mb-1">BITSTREAM CONVERSION</p>
                                <p className="text-[10px] text-muted-foreground">The secret message is converted into a continuous stream of bits (0s and 1s).</p>
                            </div>
                        </div>
                        <div className="flex gap-4 border-t border-white/5 pt-3">
                            <span className="text-xs font-bold text-primary opacity-50">02</span>
                            <div>
                                <p className="text-xs font-bold text-white mb-1">PIXEL GRID SCAN</p>
                                <p className="text-[10px] text-muted-foreground">The cover image is processed pixel-by-pixel, starting from (0,0).</p>
                            </div>
                        </div>
                        <div className="flex gap-4 border-t border-white/5 pt-3">
                            <span className="text-xs font-bold text-primary opacity-50">03</span>
                            <div>
                                <p className="text-xs font-bold text-white mb-1">LSB REPLACEMENT</p>
                                <p className="text-[10px] text-muted-foreground">The R, G, or B channel's last bit is swapped with the next bit from our secret stream.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="blueprint" className="bg-primary/5 border border-primary/20 p-5 rounded-xl space-y-4">
                    <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                        <Zap size={18} /> Blueprint: Bit Capacity
                    </h3>
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span>Small Profile Pic (400x400)</span>
                                <span className="text-primary">~60 KB</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full"><div className="h-full bg-primary w-[20%]" /></div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span>HD Wallpaper (1920x1080)</span>
                                <span className="text-primary">~770 KB</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full"><div className="h-full bg-primary w-[80%]" /></div>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-3">
                            <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Logic: Pixel Payload</h5>
                            <div className="bg-black/40 p-3 rounded-lg font-mono text-[9px] text-primary/70">
                                <p>// Max Secret Length (Bytes)</p>
                                <p>const capacity = (pxWidth * pxHeight * 3) / 8;</p>
                                <p>const overhead = 32; // Metadata header</p>
                                <p>return capacity - overhead;</p>
                            </div>
                            <p className="text-[8px] text-muted-foreground italic">Note: Every 8 pixels in the cover image can hold precisely 3 bytes of your secret message.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="not-prose bg-red-500/10 border border-red-500/30 p-5 rounded-xl my-6 flex gap-4 items-center">
                <EyeOff className="text-red-500 shrink-0" size={24} />
                <div>
                    <h4 className="text-red-400 font-mono font-bold mb-1">⚠️ Format Sensitivity</h4>
                    <p className="text-[10px] text-foreground/80">
                        Steganography is fragile. Saving an image as a <strong>JPEG</strong> will destroy the hidden bits due to lossy compression. Always use <strong>PNG</strong> or <strong>BMP</strong> to preserve every pixel exactly.
                    </p>
                </div>
            </div>

            <hr className="my-12 border-border" />

            <div className="not-prose bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 mb-12 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <div className="bg-background rounded-full p-4 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <Zap className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Ready for the Final Test?</h3>
                    <p className="text-sm text-foreground/80">
                        You've mastered all the core modules. Now put your skills to the ultimate test in the cryptographic escape room.
                    </p>
                </div>
                <Link href="/escape-room" className="group flex items-center text-center gap-3 bg-red-500 text-white px-6 py-4 rounded-md font-bold hover:bg-red-600 transition-colors shadow-lg whitespace-nowrap">
                    Enter The Escape Room
                </Link>
            </div>

            <div className="not-prose flex justify-between">
                <Link href="/learn/randomness" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 pb-8">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back: Randomness
                </Link>
            </div>
        </div>
    );
}
