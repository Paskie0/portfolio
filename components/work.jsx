import Link from "next/link";

export default function Work({title, description, url, year}) {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-col border border-dotted border-muted-foreground p-2 hover:bg-accent-fun/75">
      <span className="font-extrabold">{title}</span>
      <span className="italic">{year}</span>
      <span>{description}</span>
    </Link>
  );
}
