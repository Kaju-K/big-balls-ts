import React from "react";
import { getDictionary } from "./dictionaries";
import { LanguagesDictionary } from "@/types/dictionary";
import HeroSection from "./components/HeroSection";
import GeneralSection from "@/components/generalSection";
import paintSplash from "@/../public/paint-splash.png";
import graffitiFootball from "@/../public/graffiti-football.png";
import SectionKnowMore from "./components/SectionKnowMore";
import SectionCreateLeague from "./components/SectionCreateLeague";
import { getSession } from "@/services/user/session";

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict: LanguagesDictionary = await getDictionary(lang);

  const session = await getSession();
  // console.log(session);

  return (
    <div className="flex flex-col items-center">
      <HeroSection dict={dict} lang={lang} />
      <div className="max-w-[1400px]">
        <GeneralSection
          title={dict.homePage.sectionKnowMore.title}
          image={paintSplash}
          imagePosition="left"
        >
          <SectionKnowMore lang={lang} dict={dict} />
        </GeneralSection>
        <GeneralSection
          title={dict.homePage.sectionCreateLeague.title}
          image={graffitiFootball}
        >
          <SectionCreateLeague lang={lang} dict={dict} />
        </GeneralSection>
      </div>
    </div>
  );
}
