import type {Metadata} from "next";
import {Geist, Geist_Mono, Doto} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import {ThemeProvider} from "@/components/theme-provider";

const sentient = localFont({
  variable: "--font-sentient",
  src: [
    {
      path: "../public/fonts/Sentient/Sentient-Variable.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/Sentient/Sentient-VariableItalic.ttf",
      style: "italic",
    },
  ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} ${sentient.variable} antialiased font-doto`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
