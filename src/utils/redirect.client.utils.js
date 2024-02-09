import { signOut } from "next-auth/react";

export const clientRedirectToLogin = () => {
  signOut({ redirect: true, callbackUrl: "/login" });
};
