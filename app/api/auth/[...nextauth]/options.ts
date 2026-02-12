import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { revalidatePath } from "next/cache";
// import { hash } from "bcryptjs";

import { dbConnect } from "@/service/dbConnect";
import { getErrorMessage } from "@/lib/errorMessageHandler";
import { UserModel } from "@/models/user.model";
import { isCurrentTimeBeforeResendOtp } from "@/lib/util";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        otp: { type: "text" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            // email: "admin123@sciencekidz.in",
            email: "lifeinfosandeep01@gmail.com",
          });
          console.log('[FROM_OPTIONS]', user);

          if (!user) {
            throw new Error("User not found");
          }

          const currentTime = new Date();
          console.log(
            currentTime,
            user.resendOtp,
            user.email,
            credentials.otp,
            user.otp,
            isCurrentTimeBeforeResendOtp(currentTime, user.resendOtp)
          );

          if (
            credentials.otp == user.otp &&
            isCurrentTimeBeforeResendOtp(currentTime, user.resendOtp)
          ) {
            // revalidatePath("/");

            return {
              email: user.email,
            };
          } else {
            if (!isCurrentTimeBeforeResendOtp(currentTime, user.resendOtp)) {
              throw new Error("OTP has expired. Please request a new one.");
            } else {
              throw new Error("Incorrect OTP");
            }
          }
        } catch (error: unknown) {
          console.error(getErrorMessage(error));
          throw new Error("Internal Auth Error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 2 },
  pages: { signIn: "/admin-login" },
  jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 60 * 2 },
};
