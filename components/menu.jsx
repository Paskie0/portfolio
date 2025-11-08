"use client";

import {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import MenuIcon from "@/components/icons/MenuIcon";
import Link from "next/link";

export default function DropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="inline-flex sm:hidden">
        <Button id="menuIcon" variant="ghost" size="icon" className="">
          <MenuIcon classname={`text-muted-foreground duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`} />
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
