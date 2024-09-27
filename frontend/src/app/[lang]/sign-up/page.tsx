import SignForm from "@/components/signupForm";
import React from "react";

export default function LogInPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-background">
      <SignForm lang={lang} />
    </div>
  );
}
