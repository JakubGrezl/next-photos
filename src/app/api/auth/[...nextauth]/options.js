import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    CredentialsProvider({
      profile(profile) {
        return { ...profile };
      },
    }),
    GithubProvider({
      profile(profile) {
        return { ...profile };
      },
    }),
  ],
};
