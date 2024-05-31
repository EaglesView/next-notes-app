import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const notes = await prisma.note.findMany({
                where: {
                    userId: req.query.userId as string, // Assuming userId is passed as a query parameter
                },
            });
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching notes' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
