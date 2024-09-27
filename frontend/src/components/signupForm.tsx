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

export default function SignForm({ lang }: { lang: string }) {
  return (
    <Card className="mx-auto w-3/4 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Username</Label>
            <Input id="username" placeholder="username" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repeatedPassword">Repeat Password</Label>
            <Input id="repeatedPassword" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          {/* <Button variant="outline" className="w-full">
            Sign up with Google account
          </Button> */}
        </div>
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
