import { getCookie, saveCookie } from "@/actions/cookies";
import { apiUrl } from "@/config";
import { accessTokenExpiration, refreshTokenExpiration } from "@/globals/times";
import { FetchOptions } from "@/types/fetch";

export async function clientFetch(
  fetchUrl: string,
  fetchOptions: FetchOptions,
) {
  const start = performance.now();

  const clientAccessToken = await getCookie("accessToken");
  const clientRefreshToken = await getCookie("refreshToken");

  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Authorization: clientAccessToken?.value
        ? `Bearer ${clientAccessToken?.value}`
        : "",
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
    isRefreshNeeded: fetchOptions.isRefreshNeeded
      ? fetchOptions.isRefreshNeeded
      : true,
  };

  const serverRes = await fetch(fetchUrl, options);
  const res = await serverRes.json();

  // If there is no cookie stored, just return the server response since there is no token to refresh
  if ((!clientAccessToken && !clientRefreshToken) || !options.isRefreshNeeded) {
    const end = performance.now();
    console.log(`No cookies: ${start - end}`);

    return res;
  }

  // Here we start dealing with the tokens: refresh and remake the call if necessary
  const refreshServerRes = await fetch(`${apiUrl}/user/refreshToken`, {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: clientRefreshToken?.value }),
  });

  const refreshRes = await refreshServerRes.json();

  if (
    !refreshRes.success ||
    refreshRes.isTokenValid === false ||
    refreshRes.isUserFound === false
  ) {
    const end = performance.now();
    console.log(`token invalid: ${start - end}`);
    return res;
  }

  const newAccessToken = refreshRes.accessToken;
  const newRefreshToken = refreshRes.refreshToken;

  await saveCookie("accessToken", newAccessToken, accessTokenExpiration);
  await saveCookie(
    "refreshToken",
    newRefreshToken,
    refreshTokenExpiration,
    true,
  );

  if (!res.success && res.isTokenNeeded) {
    const newOptions = { ...options, isRefreshNeeded: false };
    const newServerRes = await fetch(fetchUrl, newOptions);
    const newRes = newServerRes.json();
    const end = performance.now();
    console.log(`call remade: ${start - end}`);
    return newRes;
  }

  const end = performance.now();
  console.log(`call worked the first time: ${start - end}`);
  return res;
}
