"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlitchText } from "@/components/ui/GlitchText";
import { Shield, BookOpen, KeyRound, Lock, Fingerprint, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const academyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // --- Hero Animations ---
    const ctx = gsap.context(() => {
        // Fast, snappy hero reveal
        gsap.from(".hero-element", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.2
        });

        // --- Tools Section Scroll Animation ---
        gsap.from(".tool-card", {
            scrollTrigger: {
                trigger: toolsRef.current,
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // --- Academy Section Scroll Animation ---
        gsap.from(".academy-content", {
            scrollTrigger: {
                trigger: academyRef.current,
                start: "top 70%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }, [heroRef, toolsRef, academyRef]); // Scope selections to these refs

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
        
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-8">
            <Shield size={14} /> Systems Online
        </div>

        <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-black font-mono tracking-tighter mb-6 max-w-5xl leading-[1.1]">
            Master the Art of <br />
            <GlitchText text="Digital Secrecy" className="text-primary" />
        </h1>

        <p className="hero-element text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
            An interactive playground and academy for understanding cryptography, steganography, and password security. Built entirely in your browser.
        </p>

        <div className="hero-element flex flex-col sm:flex-row gap-4">
            <Link href="/tools/text-crypto">
                <CyberButton className="w-full sm:w-auto text-lg h-14 px-8">
                    Open Toolkit <ArrowRight className="ml-2" size={20} />
                </CyberButton>
            </Link>
            <Link href="/learn/history">
                <CyberButton variant="secondary" className="w-full sm:w-auto text-lg h-14 px-8">
                    Enter Academy
                </CyberButton>
            </Link>
        </div>

      </section>


      {/* --- TOOLS PREVIEW SECTION --- */}
      <section ref={toolsRef} className="py-32 px-4 md:px-12 bg-muted/10 relative border-y border-border">
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">Complete Cyber Suite</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                      Five highly interactive tools designed to let you physically manipulate data and understand how modern encryption works.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Tool Card 1 */}
                  <Link href="/tools/text-crypto" className="tool-card group block p-8 bg-background border border-border rounded-2xl hover:border-primary/50 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          <FileText size={100} className="text-primary" />
                      </div>
                      <Shield className="text-primary w-10 h-10 mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Text Cryptography</h3>
                      <p className="text-muted-foreground">Encrypt, decrypt, and hash text using AES, DES, MD5, and SHA algorithms.</p>
                  </Link>

                  {/* Tool Card 2 */}
                  <Link href="/tools/steganography" className="tool-card group block p-8 bg-background border border-border rounded-2xl hover:border-accent/50 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          <Lock size={100} className="text-accent" />
                      </div>
                      <Fingerprint className="text-accent w-10 h-10 mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Steganography</h3>
                      <p className="text-muted-foreground">Hide secret text messages inside the invisible LSB pixels of an image.</p>
                  </Link>

                  {/* Tool Card 3 */}
                  <Link href="/tools/entropy" className="tool-card group block p-8 bg-background border border-border rounded-2xl hover:border-blue-500/50 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          <KeyRound size={100} className="text-blue-500" />
                      </div>
                      <KeyRound className="text-blue-500 w-10 h-10 mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Entropy & Keys</h3>
                      <p className="text-muted-foreground">Check passwords against dictionaries and generate mathematically secure keys.</p>
                  </Link>
              </div>
          </div>
      </section>

      {/* --- ACADEMY & ESCAPE ROOM SECTION --- */}
      <section ref={academyRef} className="py-32 px-4 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="academy-content">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-6">
                      <BookOpen size={14} /> Curriculum
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-6">Interactive Learning</h2>
                  <p className="text-xl text-muted-foreground mb-8">
                      Stop reading dry Wikipedia articles. Our academy uses highly interactive React animations to visualize block ciphers, key exchanges, and the math behind the hashes.
                  </p>
                  <ul className="space-y-4 mb-8 font-mono text-sm">
                      <li className="flex items-center gap-3"><ArrowRight className="text-primary" /> History of Ciphers</li>
                      <li className="flex items-center gap-3"><ArrowRight className="text-primary" /> The Avalanche Effect</li>
                      <li className="flex items-center gap-3"><ArrowRight className="text-primary" /> Block vs Stream Ciphers</li>
                      <li className="flex items-center gap-3"><ArrowRight className="text-primary" /> Public Key Cryptography</li>
                  </ul>
                  <Link href="/learn/history">
                      <CyberButton variant="secondary" className="h-12 px-6">Start Learning</CyberButton>
                  </Link>
              </div>

              {/* Escape Room CTA Card */}
              <div className="academy-content relative p-1 rounded-2xl bg-gradient-to-br from-red-500 via-transparent to-transparent">
                  <div className="bg-black border border-border/50 rounded-xl p-8 md:p-12 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />
                      
                      <Lock className="text-red-500 w-12 h-12 mb-6" />
                      <h3 className="text-3xl font-bold font-mono mb-4 text-white">The Final Challenge</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                          Put your skills to the test. A rogue AI has locked down the mainframe. You must use the tools you've mastered to break a 3-stage cryptographic puzzle and escape the room.
                      </p>
                      
                      <Link href="/escape-room">
                          <CyberButton variant="danger" className="w-full text-lg h-14 tracking-widest uppercase">
                              Initiate Override
                          </CyberButton>
                      </Link>
                  </div>
              </div>

          </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm font-mono mt-auto relative z-10 bg-background">
          <p>© {new Date().getFullYear()} CipherAcademy. Built for educational purposes.</p>
      </footer>

    </div>
  );
}
