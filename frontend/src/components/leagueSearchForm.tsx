"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LanguagesDictionary } from "@/types/dictionary";

interface LeagueSearchForm {
  league: string;
}

export default function LeagueSearchForm({
  dict,
}: {
  dict: LanguagesDictionary;
}) {
  const { register, handleSubmit } = useForm<LeagueSearchForm>();

  const onSubmit: SubmitHandler<LeagueSearchForm> = async (leagueSearch) => {
    if (!leagueSearch?.league) return;
    console.log(`Searching for ${leagueSearch.league}`);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder={dict.homePage.heroSection.formPlaceholder}
        className="bg-white pr-10 text-black"
        {...register("league")}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full text-black"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
