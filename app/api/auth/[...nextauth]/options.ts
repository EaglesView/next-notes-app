import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../../lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
//export default authHandler;

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Username001",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "null"
                }
            },
            async authorize(credentials) {
                //const user = {id:"42",name:"Dave",password:"test123"};
                const user = prisma.account.findUnique({
                    where: {
                        userId: "Test"
                    },
                })
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
};
export default {
    options,
    authHandler,
}
