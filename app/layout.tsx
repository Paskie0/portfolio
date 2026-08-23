import type {Metadata} from "next";
import {Inter, Geist, Geist_Mono, Doto} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pascal de Wit",
  description: "Pascal's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased font-inter min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
