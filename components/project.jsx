import Link from "next/link";

export default function Project({title, description, url, year}) {
  return (
    <Link href={url} className="flex items-baseline gap-2 border-muted-foreground py-2 group">
      <p><span className="font-medium group-hover:text-accent-fun">{title} <span className="group-hover:text-accent-fun/50 font-normal text-xs text-muted-foreground">{description}</span></span></p>
      <span className="flex-1 border-b border-dotted border-muted group-hover:border-accent-fun/25"></span>
      <span className="text-muted-foreground text-end group-hover:text-accent-fun/50">{year}</span>
    </Link>
  );
}
