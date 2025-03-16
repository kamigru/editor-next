import type { Metadata } from "next";
import { TrpcProvider } from "./providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Editor",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <TrpcProvider>
          {children}
        </TrpcProvider>
      </body>
    </html>
  );
}