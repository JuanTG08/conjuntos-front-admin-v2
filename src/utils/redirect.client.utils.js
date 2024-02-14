export const clientRedirectToLogin = () => {
  const { signOut } = require("next-auth/react");
  signOut({ redirect: true, callbackUrl: "/login" });
};
