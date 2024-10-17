import { apiUrl } from "@/config";
import { LoginUserFetch } from "@/types/user";
import { clientFetch } from "@/utils/defineFetchOptions";

export async function login(credentials: LoginUserFetch) {
  try {
    const res = await clientFetch(`${apiUrl}/user/login`, {
      cache: "no-cache",
      method: "POST",
      body: credentials,
    });
    return res;
  } catch {
    return {
      success: false,
      message: "Something went wrong with the sign up, please try again later.",
    };
  }
}
