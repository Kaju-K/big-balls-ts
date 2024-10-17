"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginUserFetch } from "@/types/user";
import { login } from "@/services/user/login";
import { validateEmail } from "@/globals/email-validation";
import { accessTokenExpiration, refreshTokenExpiration } from "@/globals/times";
import { useState } from "react";
import dynamic from "next/dynamic";
import { saveCookie } from "@/actions/cookies";
import { useRouter } from "next/navigation";

const PopupAlertComponent = dynamic(() => import("./popup-alert"), {
  ssr: false,
});

interface PopupAlertProps {
  type: "success" | "error";
  title: string;
  message: string;
  show: boolean;
}

export function LoginForm({ lang }: { lang: string }) {
  const [alertProps, setAlertProps] = useState<PopupAlertProps>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginUserFetch>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginUserFetch> = async (userData) => {
    const res = await login(userData);

    if (!res.success) {
      // TODO: fix this messages to come from dict file -> so we can show the error in different languages and not depend on server language answer
      if (res.isUserFound === false) {
        return setError("email", {
          type: "custom",
          message: `${res.message}`,
        });
      }
      if (res.isPasswordWrong === true) {
        return setError("password", {
          type: "custom",
          message: `${res.message}`,
        });
      }
      return setAlertProps({
        show: true,
        type: "error",
        title: "Error!",
        message: `${res.message} Please Try again later.`,
      });
    }

    const accessToken = res.accessToken;
    const refreshToken = res.refreshToken;

    // await saveCookie("accessToken", accessToken, accessTokenExpiration);
    await saveCookie(
      "refreshToken",
      refreshToken,
      refreshTokenExpiration,
      true,
    );

    router.push("/");
  };

  return (
    <Card className="mx-auto w-3/4 max-w-sm">
      <PopupAlertComponent
        {...alertProps}
        onDismiss={() => setAlertProps((prev) => ({ ...prev, show: false }))}
        duration={10000}
      />
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                validate: validateEmail,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href={`/${lang}`}
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={`/${lang}/sign-up`} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
