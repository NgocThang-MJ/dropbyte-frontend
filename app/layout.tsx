import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const inter = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Dropbyte - Simple file sharing app",
  description:
    "Effortless File Sharing: Upload, Store and Share with Ease | Dropbyte",
  authors: { name: "Liquiddev99", url: "https://github.com/liquiddev99" },
  openGraph: {
    title: "Dropbyte - Simple file sharing app",
    description:
      "Effortless File Sharing: Upload, Store and Share with Ease | Dropbyte",
  },
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
