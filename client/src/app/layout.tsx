import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from './LayoutClient';
import Navbar from "@/components/navbar";
import Footer from "@/components/common/footer";
import { useTracker } from "@/hooks/useTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OLDPhones",
  description: "Sell old phones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <LayoutClient>
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          {children}
        </div>
      </LayoutClient>
      </body>
    </html>
  );
}
