import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codinja - Improve Your Code Quality",
  description:
    "Analyze your code for best practices, security issues, and optimization opportunities",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        // url: '/images/icon-light.png',
        url: "/images/icon.svg",
        href: "/images/icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/icon.svg",
        href: "/images/icon.svg",
        // href: '/images/icon-dark.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
