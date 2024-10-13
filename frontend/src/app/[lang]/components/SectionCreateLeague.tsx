import { Button } from "@/components/ui/button";
import { GeneralSection } from "@/types/section";
import Link from "next/link";
import React from "react";

export default function SectionCreateLeague({ lang, dict }: GeneralSection) {
  return (
    <div className="flex max-w-[33rem] flex-col gap-6">
      <h3 className="text-xl">{dict.homePage.sectionCreateLeague.subtitle}</h3>
      <p>{dict.homePage.sectionCreateLeague.text}</p>
      <div className="flex justify-between">
        <Link href={`/${lang}`} className="w-2/5">
          <Button className="w-full bg-primary-foreground font-semibold text-background">
            {dict.homePage.sectionCreateLeague.createButton}
          </Button>
        </Link>
        <Link href={`/${lang}`} className="w-2/5">
          <Button className="w-full bg-primary-foreground font-semibold text-background">
            {dict.homePage.sectionCreateLeague.joinButton}
          </Button>
        </Link>
      </div>
    </div>
  );
}
