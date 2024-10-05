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
import { CreateUserForm } from "@/types/user";
import { validateEmail } from "@/globals/email-validation";
import { signUp } from "@/services/user/signUp";
import { PopupAlertComponent } from "./popup-alert";
import { useState } from "react";

interface PopupAlertProps {
  type: "success" | "error";
  title: string;
  message: string;
  show: boolean;
}

export default function SignForm({ lang }: { lang: string }) {
  const [alertProps, setAlertProps] = useState<PopupAlertProps>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<CreateUserForm>();

  const onSubmit: SubmitHandler<CreateUserForm> = async (userData) => {
    const res = await signUp(userData);

    if (!res.success) {
      if (res.error) {
        const errorField = res.error[0];
        setAlertProps({
          show: true,
          type: "error",
          title: "Error!",
          message: `${res.message}: ${errorField}`,
        });
        setError(errorField, {
          type: "custom",
          message: `${errorField} already exists`,
        });
      }
    }
  };

  function validateRepeatedPassword(value: string) {
    if (value === watch("password")) return true;
    return false;
  }

  return (
    <Card className="mx-auto my-8 w-3/4 max-w-sm">
      <PopupAlertComponent
        {...alertProps}
        onDismiss={() => setAlertProps((prev) => ({ ...prev, show: false }))}
        duration={10000}
      />
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="first-name">Username</Label>
            <Input
              id="username"
              placeholder="username"
              {...register("username", {
                required: "Username is required",
                minLength: 3,
              })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", {
                required: "Email is required",
                validate: (value) => validateEmail(value),
              })}
            />
            {errors.email && (
              <span>{errors.email.message || "Email is not valid"}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
            />
            {errors.password && (
              <span>Password should be atleast 8 characters long</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repeatedPassword">Repeat Password</Label>
            <Input
              id="repeatedPassword"
              type="password"
              {...register("repeatedPassword", {
                validate: (value) => validateRepeatedPassword(value),
              })}
            />
            {errors.repeatedPassword && <span>Passwords are not matching</span>}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          {/* <Button variant="outline" className="w-full">
            Sign up with Google account
          </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={`/${lang}/log-in`} className="underline">
            Log In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
