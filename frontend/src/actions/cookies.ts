"use server";

import { cookies } from "next/headers";

export async function saveCookie(
  name: string,
  value: string,
  time: Date,
  httpOnly = false,
) {
  cookies().set(name, value, { expires: time, httpOnly, sameSite: "lax" });
}

export async function getCookie(name: string) {
  return cookies().get(name);
}
