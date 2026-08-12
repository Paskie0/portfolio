import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Pathé Watcher",
};

export default function PatheLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}
