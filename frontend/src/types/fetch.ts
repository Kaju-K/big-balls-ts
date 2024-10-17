export interface FetchOptions {
  cache?: RequestCache;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  isRefreshNeeded?: boolean;
}
