import NextAuth from "next-auth/next";
import options from "./options";
const Handler = NextAuth(options);
export { Handler as GET, Handler as POST }