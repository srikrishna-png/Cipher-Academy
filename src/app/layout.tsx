import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { NavProvider } from "@/components/layout/NavProvider";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { SiteWrapper } from "@/components/layout/SiteWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cipher Academy | Interactive Cryptography",
  description: "Learn and use modern cryptography tools in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} antialiased bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavProvider>
            <MobileSidebar />
            <SiteWrapper>
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
            </SiteWrapper>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
