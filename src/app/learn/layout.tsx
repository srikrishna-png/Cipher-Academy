import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Book, Cpu, ScrollText, Key, Zap, Shield } from "lucide-react";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const syllabus = [
    {
      title: "Fundamentals",
      links: [
        { href: "/learn/history", label: "History & Ciphers", icon: ScrollText },
      ]
    },
    {
      title: "Integrity & Auth",
      links: [
        { href: "/learn/hashing", label: "Hashing Concepts", icon: Cpu },
        { href: "/learn/hmac", label: "HMAC Deep-Dive", icon: Shield },
      ]
    },
    {
      title: "Encryption",
      links: [
        { href: "/learn/symmetric", label: "Symmetric (AES)", icon: Book },
        { href: "/learn/file-conversion", label: "File Conversion", icon: Zap },
        { href: "/learn/asymmetric", label: "Asymmetric (RSA)", icon: Key },
        { href: "/learn/diffie-hellman", label: "Diffie-Hellman", icon: Zap },
      ]
    },
    {
      title: "Identity & Tokens",
      links: [
        { href: "/learn/digital-signatures", label: "Digital Signatures", icon: Shield },
        { href: "/learn/jwt-studio", label: "JWT Studio Theory", icon: Cpu },
        { href: "/learn/keygen", label: "Key Generation", icon: Key },
      ]
    },
    {
      title: "Advanced",
      links: [
        { href: "/learn/randomness", label: "Randomness & Entropy", icon: Zap },
        { href: "/learn/steganography", label: "Steganography", icon: Shield },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Navbar />
      <div className="flex flex-1 overflow-hidden max-w-[1200px] w-full mx-auto">

        {/* Sidebar Navigation for Academy */}
        <aside className="w-64 border-r border-border bg-muted/10 hidden md:block pt-8 pr-4 sticky top-20 h-[calc(100vh-5rem)]">
          <h2 className="px-4 mb-4 font-mono text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center gap-2">
            <Book className="w-4 h-4 text-primary" /> Syllabus
          </h2>
          <nav className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] pb-8 pr-2 custom-scrollbar">
            {syllabus.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-3">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-2 text-xs rounded-lg hover:bg-muted font-medium transition-all group border-l-2 border-transparent hover:border-primary/50"
                    >
                      <link.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Reading Content Area */}
        <main className="flex-1 w-full p-4 md:p-12 overflow-y-auto prose dark:prose-invert max-w-none text-foreground prose-headings:text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}
