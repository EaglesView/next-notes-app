import React, { useEffect, useState } from 'react';

interface Note {
    id: string;
    title: string;
    content: string;
}

const NotesList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes?userId=your-user-id');
                const data = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <p>Loading notes...</p>;
    }

    return (
        <div className="notes-container">
            {notes.map((note) => (
                <NoteCard key={note.id} title={note.title} content={note.content} />
            ))}
        </div>
    );
};

interface NoteCardProps {
    title: string;
    content: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content }) => {
    return (
        <div className="note-card">
            <h2>{title}</h2>
            <div>{content}</div>
        </div>
    );
};

export default NotesList;
