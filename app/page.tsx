import {PROJECTS} from "@/data/data";
import Project from "@/components/project";
import Link from "next/link";
import Signature from "@/components/icons/Signature";
import Location from "@/components/location";
import RandomGame from "@/components/randomGame";

export default function Home() {
  return (
    <main className="max-w-5xl mt-auto p-16 mx-auto bg-neutral-900 border border-muted">
      <div className="grid gap-16">
        <div className="grid">
          <Link href="/" className="relative w-30">
            <Signature className="w-full h-full hover:scale-95 hover:text-accent-fun transition-all duration-300" />
          </Link>
        </div>
        <div className="grid gap-8 animate-fade-in-up [animation-delay:200ms]">
            <div className="grid gap-4 text-muted-foreground">
            <span>Software Developer from <Location />.</span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo asperiores sint assumenda.</span>
              <span>Previously, worked at <Link href="/" className="text-foreground hover:text-accent-fun hover:decoration-accent-fun underline underline-offset-4 decoration-muted">Impact Academie</Link>, <Link href="/" className="text-foreground hover:text-accent-fun hover:decoration-accent-fun underline underline-offset-4 decoration-muted">Jaspers Media</Link> & <Link href="/" className="text-foreground hover:text-accent-fun hover:decoration-accent-fun underline underline-offset-4 decoration-muted">Forward Football</Link>.</span>
            </div>
        </div>
        <div className="grid gap-2 animate-fade-in-up [animation-delay:400ms]">
              {PROJECTS.slice(0, 5).map((project) => (
                <Project key={project.id} title={project.name} description={project.description} url={project.link} year={project.year} />
              ))}
        </div>
        <div className="grid grid-flow-col gap-2 text-muted-foreground animate-fade-in-up [animation-delay:600ms]">
          <div className="flex gap-2">
            <Link href="https://github.com/Paskie0" className="hover:text-accent-fun">GitHub</Link>
            <span className="select-none">·</span>
            <Link href="mailto:Pascaldewit@outlook.com" className="hover:text-accent-fun">Mail</Link>
          </div>
          <div className="flex  place-self-end font-doto font-bold">
            <RandomGame />
          </div>
        </div>
      </div>
    </main>
  );
}
