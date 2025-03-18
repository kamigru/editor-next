"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function HeaderNav() {
  const pathname = usePathname();
  const isEditorPage = pathname === "/editor";

  return (
    <header className="w-full p-4 flex justify-between items-center border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <Link href="/" className="focus:outline-none">
          <h1
            className={`${kanit.className} text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text transition-opacity hover:opacity-80 ml-2`}
          >
            HeyEditor
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href={isEditorPage ? "/" : "/editor"}>
          <Button 
            variant="outline"
            className="cursor-pointer border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-600">
            {isEditorPage ? "Volver" : "Comenzar a crear"}
          </Button>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            href="https://github.com/kamigru/editor-next"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon/github.png"
              alt="GitHub Icon"
              width={32}
              height={32}
              className="transition-opacity hover:opacity-70"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
} 