// app/api/auth/[...nextauth]/options.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userID: { label: "Username:", type: "text" },
                password: { label: "Password:", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await prisma.user.findUnique({
                    where: { id: credentials.userID }
                });

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })

    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
};

export default options;
