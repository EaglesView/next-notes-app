// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import authOptions from './options';
import { NextRequest } from 'next/server';

const handler = async (req: NextRequest) => {
    // Create a custom request object to pass to NextAuth
    const customRequest = new Request(req.url, {
        headers: req.headers,
        method: req.method,
        body: req.body,
        redirect: 'manual',
    });

    const response = await NextAuth(customRequest, authOptions);

    // Convert the response to NextResponse
    return new NextResponse(response.body, {
        headers: response.headers,
        status: response.status,
    });
};

export { handler as GET, handler as POST };
