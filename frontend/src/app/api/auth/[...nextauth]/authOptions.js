import { login } from "@/services/user/login";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          const res = await login(credentials);

          if (!res.success) {
            return null;
          }

          const accessToken = res.accessToken;
          const refreshToken = res.refreshToken;
          const userInfo = res.userInfo;

          return {
            accessToken,
            refreshToken,
            userInfo,
          };
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      console.log(`accessing callback jwt - token: ${token}`);

      if (account && user) {
        console.log(user);
        console.log(account);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          userInfo: user.userInfo,
        };
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_URL,
  pages: {
    signIn: "/login",
  },
};
