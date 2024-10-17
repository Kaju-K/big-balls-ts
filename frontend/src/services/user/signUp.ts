import { apiUrl } from "@/config";
import { CreateUserFetch } from "@/types/user";
import { clientFetch } from "@/utils/defineFetchOptions";

export async function signUp(credentials: CreateUserFetch) {
  try {
    const res = await clientFetch(`${apiUrl}/user/create-user`, {
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
