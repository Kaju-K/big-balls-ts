import { FetchOptions } from "@/types/fetch";

export function clientFetch(fetchUrl: string, fetchOptions: FetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };

  return fetch(fetchUrl, options);
}
