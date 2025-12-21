import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayan Sheikh | Portfolio",
  description: "Software Developer Portfolio - Crafted with monospace aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono">{children}</body>
    </html>
  );
}
