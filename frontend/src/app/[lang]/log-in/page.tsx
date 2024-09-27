import { LoginForm } from "@/components/loginForm";
import React from "react";

export default function LogInPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-background">
      <LoginForm lang={lang} />
    </div>
  );
}
