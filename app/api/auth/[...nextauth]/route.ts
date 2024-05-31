import NextAuth from 'next-auth';
import options from './options';

export const authHandler = NextAuth(options);

export { authHandler as GET, authHandler as POST };