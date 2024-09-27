import { apiUrl } from "@/config";

export async function signUp() {
  try {
    const res = await fetch(`${apiUrl}/user/sign-up`);
    return await res.json();
  } catch {
    return {
      success: false,
      message: "Something went wrong with the sign up, please try again later.",
    };
  }
}
