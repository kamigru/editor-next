"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-full overflow-auto">
      <section className="flex flex-col items-center justify-center h-full text-center md:flex-row md:text-left p-4">
        <div className="md:w-1/2 flex flex-col items-center justify-center px-4 md:px-8 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Bienvenido/a a <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">HeyEditor</span>!
          </h1>
          <p className="mb-6 text-left">
            Tu lienzo digital para dar vida a tus ideas. Crea, diseña y comparte
            tu arte en un entorno sencillo e intuitivo, potenciado por la magia
            de <strong>Tldraw</strong> y la comodidad de <strong>tRPC</strong>.
            Sumérgete en este editor que combina eficiencia, diseño y 
            tecnología de vanguardia.
          </p>
          <Link href="/editor">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
              Ir al Editor
              <Image
                src="/icon/brush-white.png"
                alt="Brush Icon"
                width={20}
                height={20}
                className="inline-block ml-2"
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
