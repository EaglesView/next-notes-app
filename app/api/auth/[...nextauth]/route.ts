// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import authOptions from './options';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest) => {
    const response = await NextAuth(req, authOptions);
    return response;
};

export { handler as GET, handler as POST };
