import Link from "next/link";

export default function Project({ title, description, url, year }) {
  return (
    <Link
      href={url}
      className="flex items-baseline gap-2 border-muted-foreground py-2 first:pt-0 group"
    >
      <div className="grid grid-flow-col gap-1">
        <span className="font-medium text-sm group-hover:text-accent-fun">
          {title}
        </span>
        <span className="self-center hidden xs:inline-block group-hover:text-accent-fun/75 font-normal text-xs text-muted-foreground">
          {description}
        </span>
      </div>
      <span className="flex-1 border-b border-dotted border-muted-foreground/25 group-hover:border-accent-fun/50"></span>
      <span className="text-sm text-muted-foreground text-end group-hover:text-accent-fun/75">
        {year}
      </span>
    </Link>
  );
}
