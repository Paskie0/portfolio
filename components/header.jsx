import Signature from "@/public/signature.jsx";
import Link from "next/link";
import Menu from "@/components/menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-8">
      <Link href="/" className="relative w-24">
        <Signature className="w-full h-full hover:scale-90 hover:text-red-900 transition-all duration-300" />
      </Link>
      <div className="hidden sm:flex gap-2 font-semibold">
        <Link href="https://github.com/Paskie0" className="hover:bg-red-500/75">
          GitHub
        </Link>
        <span className="text-muted-foreground select-none">•</span>
        <Link href="mailto:Pascaldewit@outlook.com?subject=Hello!" className="hover:bg-red-500/75">
          Email
        </Link>
      </div>
      <Menu />
    </header>
  );
}
