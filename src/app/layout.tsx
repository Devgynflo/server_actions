import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Jobs",
    default: "Flow Jobs",
  },
  description: "To find the best talents, you need the best opportunities. Flow Jobs is the best place to find the best opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
