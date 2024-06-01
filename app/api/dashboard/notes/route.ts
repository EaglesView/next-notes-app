// src/app/api/dashboard/notes/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from '../../auth/[...nextauth]/options';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userID = session.user.id;

    try {
        const notes = await prisma.notes.findMany({
            where: {
                authorID: userID,
            },
        });
        console.log('Fetched notes:', notes);
        return res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        return res.status(500).json({ error: 'Error fetching notes' });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userID = session.user.id;
    const { note_title, note_content } = req.body;

    if (!note_title) {
        return res.status(400).json({ error: 'note_title is required' });
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
        return res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        return res.status(500).json({ error: 'Error creating note' });
    }
}
