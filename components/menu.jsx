"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import Link from "next/link";

export default function DropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="inline-flex sm:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" loop="true" className="border-dotted border-muted-foreground bg-transparent">
        <DropdownMenuItem asChild>
          <Link href="mailto:Pascaldewit@outlook.com?subject=Hello!" className="cursor-pointer">
            Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://github.com/Paskie0" className="cursor-pointer">
            GitHub
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
