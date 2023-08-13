import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const inter = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Dropbyte",
  description: "Simple file sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#262a37]`}>{children}</body>
    </html>
  );
}
