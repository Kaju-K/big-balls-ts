import { Button } from "@/components/ui/button";
import { GeneralSection } from "@/types/section";
import Link from "next/link";
import React from "react";

export default function SectionKnowMore({ lang, dict }: GeneralSection) {
  return (
    <div className="flex max-w-[33rem] flex-col gap-6">
      <h3 className="text-xl">{dict.homePage.sectionKnowMore.subtitle}</h3>
      <p>{dict.homePage.sectionKnowMore.text}</p>
      <Link href={`/${lang}`} className="w-full">
        <Button className="w-full bg-primary-foreground font-semibold text-background">
          {dict.homePage.sectionKnowMore.button}
        </Button>
      </Link>
    </div>
  );
}
