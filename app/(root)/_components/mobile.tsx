"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Mobile = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild className="flex md:hidden">
        <Button size={"icon"} variant={"ghost"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <Link href="/">
          <h1 className="text-4xl font-creteRound">q13</h1>
        </Link>
        <Separator className="my-3" />
        <div className="flex flex-col space-y-3">
          {navLinks.map((nav) => (
            <SheetClose asChild key={nav.route}>
              <Link
                href={nav.route}
                className={cn(
                  "hover:bg-blue-400/20 py-2 px-3 flex cursor-pointer rounded-sm transition-colors items-center gap-2",
                  pathname === nav.route && "text-blue-400",
                )}
              >
                <nav.icon className="w-5 h-5" />
                {nav.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Mobile;
