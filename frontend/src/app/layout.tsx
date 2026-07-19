import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlusEmail — Your inbox, understood",
  description:
    "PlusEmail reads, summarizes, and organizes your Gmail inbox so you can ask it questions instead of scrolling through them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
