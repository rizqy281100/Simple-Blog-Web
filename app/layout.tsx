import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Simple Blog",
  description: "Technical Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-slate-50 min-h-screen">
        <ReduxProvider>
          {/* Navigasi Utama (Responsif) */}
          <nav className="bg-white border-b p-4 shadow-sm">
            <div className="container mx-auto flex justify-between items-center max-w-4xl">
              <h1 className="font-bold text-xl">SuksesCorp</h1>
              <div className="flex gap-2">
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>
                <Link href="/articles">
                  <Button>Blogs</Button>
                </Link>
              </div>
            </div>
          </nav>

          {/* Tempat halaman dirender */}
          <main className="container mx-auto p-4 max-w-4xl">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
