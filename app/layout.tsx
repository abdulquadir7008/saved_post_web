import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "./providers";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Coursework Commons",
  description: "Course discussion forum with saved posts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body`}>
        <Providers>
          <TopNav />
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
          <Footer />
          <ScrollTopButton />
        </Providers>
      </body>
    </html>
  );
}
