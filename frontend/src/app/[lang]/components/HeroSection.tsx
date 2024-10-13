import Image from "next/image";
import React from "react";
import homePageImage from "@/../public/home-page.jpg";
import logo from "@/../public/logo.png";
import { LanguagesDictionary } from "@/types/dictionary";
import LeagueSearchForm from "@/components/leagueSearchForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection({
  dict,
  lang,
}: {
  dict: LanguagesDictionary;
  lang: string;
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      <div className="flex items-center justify-center text-primary-foreground">
        <div className="flex w-4/5 flex-col items-center justify-center gap-16">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="text-center text-4xl font-bold">
              <span>{dict.homePage.heroSection.title.firstPart}</span>{" "}
              <Image src={logo} alt="big balls logo" className="inline-block" />
              <span>{dict.homePage.heroSection.title.secondPart}</span>
            </h1>
            <p className="text-center">{dict.homePage.heroSection.subtitle}</p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <LeagueSearchForm dict={dict} />
            <div className="flex w-full items-center justify-between">
              <Link href={`/${lang}/log-in`} className="w-2/5">
                <Button className="w-full bg-primary-foreground font-semibold text-background">
                  {dict.homePage.heroSection.login}
                </Button>
              </Link>
              <Link href={`/${lang}/sign-up`} className="w-2/5">
                <Button className="w-full bg-primary-foreground font-semibold text-background">
                  {dict.homePage.heroSection.signup}
                </Button>
              </Link>
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
  );
}
