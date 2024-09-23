import { LanguagesDictionary } from "@/types/dictionary";
import "server-only";

const dictionaries: Record<string, () => Promise<LanguagesDictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
