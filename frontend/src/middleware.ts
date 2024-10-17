import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales } from "./utils/locales";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const localesList = locales.map((language) => language.code);
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages();
  const defaultLocale = "en";
  const languageMatch = match(languages, localesList, defaultLocale);

  return languageMatch;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const localesList = locales.map((language) => language.code);
  const pathnameHasLocale = localesList.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
