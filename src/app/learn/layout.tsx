import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Book } from "lucide-react";
import { ACADEMY_NAV } from "@/lib/constants/navigation";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Navbar />
      <div className="flex flex-1 overflow-hidden max-w-[1200px] w-full mx-auto">

        {/* Sidebar Navigation for Academy */}
        <aside className="w-64 border-r border-border bg-muted/10 hidden md:block pt-8 pr-4 sticky top-20 h-[calc(100vh-5rem)]">
          <h2 className="px-4 mb-4 font-mono text-sm font-bold text-foreground dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
            <Book className="w-4 h-4 text-primary" /> Syllabus
          </h2>
          <nav className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] pb-8 pr-2 custom-scrollbar">
            {ACADEMY_NAV.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
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
        <main className="flex-1 w-full p-4 md:p-12 overflow-y-auto prose dark:prose-invert max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}
