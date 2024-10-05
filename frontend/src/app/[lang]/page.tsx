import Image from "next/image";
import React from "react";
import homePageImage from "@/../public/home-page.jpg";
import logo from "@/../public/logo.png";
import LeagueSearchForm from "@/components/leagueSearchForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { LanguagesDictionary } from "@/types/dictionary";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict: LanguagesDictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col">
      <div className="flex h-[calc(100vh-64px)] w-full">
        <div className="flex items-center justify-center bg-background text-primary-foreground">
          <div className="flex w-4/5 flex-col items-center justify-center gap-16">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <h1 className="text-center text-4xl font-bold">
                <span>{dict.homePage.heroSection.title.firstPart}</span>{" "}
                <Image
                  src={logo}
                  alt="big balls logo"
                  className="inline-block"
                />
                <span>{dict.homePage.heroSection.title.secondPart}</span>
              </h1>
              <p className="text-center">
                {dict.homePage.heroSection.subtitle}
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <LeagueSearchForm dict={dict} />
              <div className="flex w-full items-center justify-between">
                <Button className="w-2/5 bg-primary-foreground font-semibold text-background">
                  <Link href={`/${lang}/log-in`}>
                    {dict.homePage.heroSection.login}
                  </Link>
                </Button>
                <Button className="w-2/5 bg-primary-foreground font-semibold text-background">
                  <Link href={`/${lang}/sign-up`}>
                    {dict.homePage.heroSection.signup}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          src={homePageImage}
          alt="Man holding a microfone with a graffiti jacekt giving the news"
          className="w-3/5 flex-shrink-0 object-cover object-top"
        />
      </div>
    </div>
  );
}
