import Signature from "@/components/icons/Signature";
import Link from "next/link";
import Menu from "@/components/menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-8">
      <Link href="/" className="relative w-24">
        <Signature className="w-full h-full hover:scale-90 hover:text-accent-fun transition-all duration-300" />
      </Link>
      <div className="hidden sm:flex gap-2">
        <Link href="https://github.com/Paskie0" className="hover:bg-accent-fun/75">
          GitHub
        </Link>
        <span className="text-muted-foreground select-none">•</span>
        <Link href="mailto:Pascaldewit@outlook.com?subject=Hello!" className="hover:bg-accent-fun/75">
          Email
        </Link>
      </div>
      <Menu />
    </header>
  );
}
