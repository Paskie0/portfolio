import Link from "next/link";

export default function Project({title, description, url, year}) {
  return (
    <Link href={url} target="_blank" className="flex items-baseline gap-2 border-muted-foreground py-2 group">
      <div className="grid grid-flow-col gap-1">
        <span className="font-medium group-hover:text-accent-fun">{title}</span>
        <span className="self-center hidden xs:inline-block group-hover:text-accent-fun/75 font-normal text-xs text-muted-foreground">{description}</span>
      </div>
      <span className="flex-1 border-b border-dotted border-muted-foreground group-hover:border-accent-fun/50"></span>
      <span className="text-muted-foreground text-end group-hover:text-accent-fun/75">{year}</span>
    </Link>
  );
}
