'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative w-full h-screen flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/icon/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="font-bold text-2xl text-black">
            Prueba técnica Next.js
          </h1>
        </div>
        <nav className="flex space-x-4 mr-2">
          <Link
            href="https://github.com/kamigru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon/github.png"
              alt="GitHub Icon"
              width={32}
              height={32}
            />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icon/notion.png"
              alt="Notion Icon"
              width={36}
              height={36}
            />
          </Link>
        </nav>
      </header>
      <section className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvienido/a a mi prueba técnica
        </h1>
        <p className="mb-6">
          Aplicaión para prueba técnica contruido en Next.js con Tldraw y tRPC.
        </p>
        <Link href="/editor">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
            Ir al Editor
            <Image src="/icon/brush-white.png" alt="Brush Icon" width={20} height={20} className="inline-block ml-2" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
