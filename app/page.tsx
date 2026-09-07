import {PROJECTS} from "@/data/data";
import Project from "@/components/project";
import Link from "next/link";
import Signature from "@/components/icons/Signature";
import Location from "@/components/location";
import RandomGame from "@/components/randomGame";
import ThemeSwitcher from "@/components/theme-switcher";
import EffectHint from "@/components/effect-hint";
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl lg:mx-auto">
      <div className="max-w-5xl lg:mx-auto">
        <EffectHint />
      </div>
      <main className="select-text min-h-screen lg:min-h-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto p-8 xs:p-10 sm:p-16 md:p-20 lg:p-16 bg-stone-100/75 dark:bg-stone-900/75 border border-transparent lg:border-muted-foreground/50 lg:dark:border-muted">
        <div className="grid gap-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative w-30">
              <Signature className="w-full h-full hover:scale-95 text-foreground hover:text-accent-fun transition-all duration-300" />
            </Link>
            <ThemeSwitcher />
          </div>
          <div className="grid gap-8 animate-fade-in-up [animation-delay:200ms]">
            <div className="grid gap-4 text-muted-foreground">
              <span>Software Developer from <Location /><span className="text-nowrap">, The Netherlands.</span></span>
              <span>Currently working on side projects & exploring new tech.</span>
              <span>Previously worked at <Link href="https://www.impact-academie.com/" className="text-nowrap text-foreground hover:text-accent-fun hover:decoration-accent-fun">Impact Academie</Link>, <Link href="https://www.jaspersmedia.com/" className="text-nowrap text-foreground hover:text-accent-fun hover:decoration-accent-fun">Jaspers Media</Link> & <Link href="https://forward.football/" className="text-nowrap text-foreground hover:text-accent-fun hover:decoration-accent-fun">Forward Football</Link>.</span>
            </div>
          </div>
          <div className="grid gap-2 animate-fade-in-up [animation-delay:400ms]">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Projects</span>
              <Link href="https://github.com/Paskie0" className="group items-center text-xs text-muted-foreground hover:text-accent-fun flex gap-0.5">
                <span className="group-hover:text-accent-fun text-xs text-muted-foreground">View all</span>
                <ArrowUpRight size={12} className="group-hover:text-accent-fun group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
              </Link>
            </div>
            <hr className="text-muted"/>
            {PROJECTS.slice(0, 5).map((project) => (
              <Project key={project.id} title={project.name} description={project.description} url={project.link} year={project.year} />
            ))}
          </div>
          <div className="justify-items-center sm:justify-items-stretch sm:justify-self-stretch grid grid-flow-row sm:grid-flow-col gap-2 text-muted-foreground animate-fade-in-up [animation-delay:600ms]">
            <div className="flex gap-2">
              <Link href="https://github.com/Paskie0" className="hover:text-accent-fun">GitHub</Link>
              <span className="select-none">·</span>
              <Link href="mailto:Pascaldewit@outlook.com" className="hover:text-accent-fun">Email</Link>
            </div>
            <div className="flex sm:place-self-end font-doto font-bold">
              <RandomGame />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
