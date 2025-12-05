import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import UnlockKeyListener from "@/components/UnlockKeyListener";

export const metadata = {
  title: "Marble Market",
  description: "AI-powered marble identification & collector marketplace."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0d12] text-white min-h-screen">
        {/* Secret code listener: type "marblealpha" */}
        <UnlockKeyListener />

        {/* Always visible on all pages */}
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
