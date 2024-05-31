import NextAuth from 'next-auth';
import options from './options';
import { NextRequest, NextResponse } from 'next/server';

const handler = (req: NextRequest, res: NextResponse) => NextAuth(options)(req, res);

export { handler as GET, handler as POST };