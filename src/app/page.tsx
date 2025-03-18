"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-full overflow-auto">
      <section className="flex flex-col items-center justify-center h-full text-center md:flex-row md:text-left p-4">
        <div className="md:w-1/2 flex flex-col items-center justify-center px-4 md:px-8 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-16">
            ¡Bienvenidx a <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">HeyEditor</span>!
          </h1>
          <Link href="/editor">
            <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
              Ir al Editor
              <Image
                src="/icon/brush-white.png"
                alt="Brush Icon"
                width={20}
                height={20}
                className="inline-block ml-2 animate-paint"
              />
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image src="/painting.png" alt="" width={374} height={374} />
        </div>
      </section>
    </main>
  );
}
