import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupabaseProvider from "@/components/SupabaseProvider";

export const metadata = {
  title: "Mostly Marbles",
  description: "Marble marketplace & AI identifier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
