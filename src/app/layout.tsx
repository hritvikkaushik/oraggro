import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Flowbite>{children}</Flowbite>
      </body>
    </html>
  );
}
