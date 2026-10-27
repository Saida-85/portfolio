import type { Metadata } from "next";
import BackgroundMount from "@/components/BackgroundMount";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saida Nosrat Orfa | Web Developer",
  description:
    "Portfolio of Saida Nosrat Orfa, a web developer building modern, responsive, and user-friendly digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundMount />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}