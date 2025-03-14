import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
        <h1 className="text-4xl font-bold">
            Bienvenido a la prueba técnica de Kamila Graña
</h1>
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icon/notion.png"
            alt="Notion icon"
            width={16}
            height={16}
          />
          Doc
        </a>
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/kamigru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icon/github.png"
            alt="Github icon"
            width={16}
            height={16}
          />
          Repositoy
        </a> */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/kamigru/editor-next"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icon/github.png"
            alt="Github icon"
            width={16}
            height={16}
          />
          Ir al repositorio →
        </a>
      </footer>
    </div>
  );
}
