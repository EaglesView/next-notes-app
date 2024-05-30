import prisma from "@/lib/prisma"
import { GetServerSideProps } from "next";
export const fetchAllNotes: GetServerSideProps = async ({ params }) => {
    const notes = await prisma.notes.findMany({
        where: {
            authorID: String(params?.id),
        },
    });
    return {
        props: notes,
    };
};
export const fetchNotesByTag: GetServerSideProps = async ({ params }) => {
    const notes = await prisma.notes.findMany({
        where: {
            authorID: String(params?.id),
        },
        include: {
            tags: {
                select: { tag_name: true },
            },
        },
    });
    return {
        props: notes,
    };
};
