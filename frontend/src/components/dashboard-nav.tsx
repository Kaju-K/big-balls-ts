"use client";

import Link from "next/link";
import { CircleUser, Menu, SprayCan, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguagesDictionary } from "@/types/dictionary";

export function DashboardNavComponent({
  lang,
  dict,
}: {
  lang: string;
  dict: LanguagesDictionary;
}) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <SprayCan className="h-6 w-6" />
          <span className="sr-only">Big Balls</span>
        </Link>
        {dict.navbar.links.map((link: string[], index: number) => (
          <Link
            key={`${link[0]}-${index}`}
            href={`/${lang}/${link[1]}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link[0]}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">
              {dict.navbar["hamburger-screen-reader"]}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <SprayCan className="h-6 w-6" />
              <span className="">Big Balls</span>
            </Link>
            {dict.navbar.links.map((link: string[], index: number) => (
              <Link
                key={`${link[0]}-${index}`}
                href={`/${lang}/${link[1]}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link[0]}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procure ligas ou seus amigos"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        {/* TODO: change this to !isLoggedIn ? ... */}
        {true ? (
          <Link
            href={`/${lang}/log-in`}
            className="flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-4 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Log In
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">
                  {dict.navbar["avatar-screen-reader"]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
