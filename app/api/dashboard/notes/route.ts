import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const { authorID } = req.query;
            if (!authorID) {
                return res.status(400).json({ error: 'authorID is required' });
            }
            const notes = await prisma.notes.findMany({
                where: {
                    authorID: authorID as string,
                },
            });
            console.log('Fetched notes:', notes); // Log for debugging
            res.status(200).json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ error: 'Error fetching notes' });
        }
    } else if (req.method === 'POST') {
        try {
            const { note_title, note_content, authorID } = req.body;
            if (!note_title || !authorID) {
                return res.status(400).json({ error: 'note_title and authorID are required' });
            }
            const newNote = await prisma.notes.create({
                data: {
                    note_title,
                    note_content,
                    authorID,
                },
            });
            console.log('Created note:', newNote); // Log for debugging
            res.status(201).json(newNote);
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({ error: 'Error creating note' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default Handler;
