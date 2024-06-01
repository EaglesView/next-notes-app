// src/app/api/dashboard/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../../auth/[...nextauth]/options';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const userID = session.user.id;

    try {
        const notes = await prisma.notes.findMany({
            where: {
                authorID: userID,
            },
        });
        console.log('Fetched notes:', notes);
        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userID = session.user.id;
    const { note_title, note_content } = await req.json();

    if (!note_title) {
        return NextResponse.json({ error: 'note_title is required' }, { status: 400 });
    }

    try {
        const newNote = await prisma.notes.create({
            data: {
                note_title,
                note_content,
                authorID: userID,
            },
        });
        console.log('Created note:', newNote);
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
    }
}
