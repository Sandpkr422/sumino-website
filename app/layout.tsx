import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "SUMINO | Preventive Healthcare & Family Health Intelligence Platform",
    template: "%s | SUMINO Healthcare"
  },
  description: "SUMINO helps Indian families identify health risks early, track daily vital indicators, and take preventive action at home before problems become medical emergencies. Discover prevention-first family healthcare.",
  keywords: ["Preventive Healthcare", "Family Health Monitoring", "Early Disease Detection", "Healthcare Prevention", "AI Healthcare India", "Elderly Care Monitoring"],
  authors: [{ name: "SUMINO Healthcare Technology" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SUMINO | Prevention Starts at Home",
    description: "Identify family health risks early, stay informed, and take proactive action before problems become medical emergencies.",
    url: "https://www.sumino.in",
    siteName: "SUMINO",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
