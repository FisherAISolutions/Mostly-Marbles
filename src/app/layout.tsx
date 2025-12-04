import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupabaseProvider from "@/components/SupabaseProvider";
import type { ReactNode } from "react";

export const metadata = {
  title: "Marble Market",
  description: "Marble marketplace & AI identifier for collectors."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}

