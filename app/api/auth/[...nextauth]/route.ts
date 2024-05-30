import NextAuth from "next-auth/next";
import options from "./options";
secret: process.env.SECRET;
const Handler = NextAuth(options);
export { Handler as GET, Handler as POST }