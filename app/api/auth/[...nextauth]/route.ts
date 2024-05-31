import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import options from './options';

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(options)(req, res);

export { handler as GET, handler as POST };