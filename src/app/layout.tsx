import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";

const font = Inter({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Oraggro",
  description: "Oracle aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <Flowbite>{children}</Flowbite>
      </body>
    </html>
  );
}
