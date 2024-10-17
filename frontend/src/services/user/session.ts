import { apiUrl } from "@/config";
import { clientFetch } from "@/utils/defineFetchOptions";

export async function getSession() {
  try {
    const res = await clientFetch(`${apiUrl}/user/get-session`, {
      method: "GET",
      cache: "no-cache",
    });

    return res;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
