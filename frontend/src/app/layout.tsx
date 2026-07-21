import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "MailMind — Your inbox, distilled",
  description: "An AI assistant that reads your inbox so you don't have to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
