"use server";

import { cookies } from "next/headers";

export async function saveCookie(name: string, value: string, time: Date) {
  cookies().set(name, value, { expires: time });
}

export async function getCookie(name: string) {
  return cookies().get(name);
}
