import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { TOOLS_NAV } from "@/lib/constants/navigation";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Navbar />
      <div className="flex flex-1 overflow-hidden max-w-[1400px] w-full mx-auto">

        {/* Sidebar Navigation for Tools */}
        <aside className="w-64 border-r border-border bg-muted/20 hidden md:block pt-8 pr-4">
          <h2 className="px-4 mb-4 font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Crypto Suite
          </h2>
          <nav className="flex flex-col gap-2">
            {TOOLS_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-muted font-medium transition-colors"
              >
                <link.icon className="w-4 h-4 text-primary" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Tool Content Area */}
        <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto overflow-x-hidden relative">
          {children}

          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </main>
      </div>
    </div>
  );
}
