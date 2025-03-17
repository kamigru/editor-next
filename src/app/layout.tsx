import type { Metadata } from "next";
import { TrpcProvider } from "./providers";
import "@/styles/globals.css";
import HeaderNav from "@/components/HeaderNav";

export const metadata: Metadata = {
  title: "HeyEditor",
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
    <html lang="es" className="h-full">
      <body className="flex flex-col h-full">
        <TrpcProvider>
          <HeaderNav />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </TrpcProvider>
      </body>
    </html>
  );
}