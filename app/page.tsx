import {PROJECTS} from "@/data/data";
import Project from "@/components/project";
import {WORK} from "@/data/data";
import Work from "@/components/work";
import RandomGame from "@/components/randomGame";
import Location from "@/components/location";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto grid gap-8 px-8 justify-center">
      <div className="grid gap-8">
        <div className="grid">
          <span className="text-4xl">Pascal</span>
          <span className="italic">Software Developer</span>
          <Location />
          <RandomGame />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="grid grid-rows-[min-content_1fr] gap-2">
          <span className="text-xl text-accent-fun font-bold">Work</span>
          <div className="flex flex-col gap-4">
            {WORK.map((work) => (
              <Work key={work.id} title={work.name} description={work.description} url={work.link} year={work.year} />
            ))}
          </div>
        </div>
        <div className="grid grid-rows-[min-content_1fr_min-content] gap-2">
          <span className="text-xl text-accent-fun font-bold">Projects</span>
          <div className="flex flex-col gap-4">
            {PROJECTS.slice(0, 5).map((project) => (
              <Project key={project.id} title={project.name} description={project.description} url={project.link} />
            ))}
            <Link href="https://github.com/Paskie0" target="_blank" className="hover:bg-accent-fun/75">
              View all projects -&gt;
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-full grid gap-4">
        <span className="text-xl text-accent-fun font-bold">Blog - Under Construction</span>
        <Link
          href="/"
          className="flex justify-between items-center p-2 border border-dotted border-muted-foreground hover:bg-accent-fun/75 overflow-hidden">
          <span className="shrink-0">01/01/2026</span>
          <span className="truncate min-w-0 ml-8 text-right flex-1">Lorem ipsum dolor sit amet.</span>
        </Link>
        <Link
          href="/"
          className="flex justify-between items-center p-2 border border-dotted border-muted-foreground hover:bg-accent-fun/75 overflow-hidden">
          <span className="shrink-0">01/01/2027</span>
          <span className="truncate min-w-0 ml-8 text-right flex-1">Lorem ipsum dolor sit amet.</span>
        </Link>
        <Link
          href="/"
          className="flex justify-between items-center p-2 border border-dotted border-muted-foreground hover:bg-accent-fun/75 overflow-hidden">
          <span className="shrink-0">01/01/2028</span>
          <span className="truncate min-w-0 ml-8 text-right flex-1">Lorem ipsum dolor sit amet.</span>
        </Link>
      </div>
      <div className="col-span-full">
        <span className="text-xl text-accent-fun font-bold">Stuff - Under Construction</span>
      </div>
    </main>
  );
}
