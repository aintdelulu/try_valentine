import type { Metadata } from "next";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import AudioToggle from "@/components/AudioToggle";

export const metadata: Metadata = {
  title: "Ethereal Midnight",
  description: "A Journey of the Heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ParticleBackground />
        <AudioToggle />
        <main>{children}</main>
      </body>
    </html>
  );
}
