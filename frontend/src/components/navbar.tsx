"use client";

import Link from "next/link";
import { CircleUser, Menu, SprayCan, Search, Languages } from "lucide-react";
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
import { locales } from "@/utils/locales";
import { usePathname, useRouter } from "next/navigation";

export function NavComponent({
  lang,
  dict,
}: {
  lang: string;
  dict: LanguagesDictionary;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function redirectLanguage(local: { code: string }) {
    const pathnameList = pathname.split("/");
    pathnameList[1] = local.code;
    const newPathname = pathnameList.join("/");
    router.push(newPathname);
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-black px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-lg font-semibold text-muted-foreground hover:text-foreground md:text-base"
        >
          <SprayCan className="h-6 w-6" />
          <span className="sr-only">Big Balls</span>
        </Link>
        {dict.navbar.links.map(
          (
            link: { text: string; link: string; icon: string },
            index: number,
          ) => (
            <Link
              key={`${link.text}-${index}`}
              href={`/${lang}/${link.link}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.text}
            </Link>
          ),
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">
              {dict.navbar["hamburger-screen-reader"]}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 text-lg font-semibold text-muted-foreground hover:text-foreground"
            >
              <SprayCan className="h-6 w-6" />
              <span className="">Big Balls</span>
            </Link>
            {dict.navbar.links.map(
              (
                link: { text: string; link: string; icon: string },
                index: number,
              ) => (
                <Link
                  key={`${link.text}-${index}`}
                  href={`/${lang}/${link.link}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.text}
                </Link>
              ),
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={dict.navbar.search}
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-md text-muted-foreground hover:text-foreground"
            >
              <Languages className="h-5 w-5" />
              <span className="sr-only">
                {dict.navbar["languages-screen-reader"]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {locales.map((local, index) => {
              return (
                <DropdownMenuItem
                  key={`${local.code}-${index}`}
                  onClick={() => redirectLanguage(local)}
                  className="cursor-pointer"
                >
                  {local.language}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* TODO: change this to !isLoggedIn ? ... */}
        {true ? (
          <Link
            href={`/${lang}/log-in`}
            className="flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-4 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground"
          >
            {dict.navbar.login}
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
