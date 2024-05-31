import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const authorID = searchParams.get('authorID');

    if (!authorID) {
        return NextResponse.json({ error: 'authorID is required' }, { status: 400 });
    }

    try {
        const notes = await prisma.notes.findMany({
            where: {
                authorID: authorID as string,
            },
        });
        console.log('Fetched notes:', notes); // Log for debugging
        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
    }
};

const POST = async (req: NextRequest) => {
    try {
        const { note_title, note_content, authorID } = await req.json();

        if (!note_title || !authorID) {
            return NextResponse.json({ error: 'note_title and authorID are required' }, { status: 400 });
        }

        const newNote = await prisma.notes.create({
            data: {
                note_title,
                note_content,
                authorID,
            },
        });
        console.log('Created note:', newNote); // Log for debugging
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
    }
};

export { GET, POST };
