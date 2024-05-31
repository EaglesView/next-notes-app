import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const notes = await prisma.notes.findMany({
                where: {
                    authorID: req.query.authorID as string, // Assuming userId is passed as a query parameter
                },
            });
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching notes' });
        }
    } else if (req.method === 'POST') {
        try {
            const { note_title, note_content, authorID } = req.body;
            const newNote = await prisma.notes.create({
                data: {
                    note_title,
                    note_content,
                    authorID,
                },
            });
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({ error: 'Error creating note' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
